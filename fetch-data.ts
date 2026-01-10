import fs from "node:fs/promises"
import path from "node:path"
import mysql from "mysql2/promise"

async function main() {
  // Update these values with your DB credentials
  const connection = await mysql.createConnection({
    host: "macdermott.pdx1-mysql-a7-2a.dreamhost.com",
    user: "hs_prod_client",
    password: "77FkEHdi4DT$y4z",
    database: "humsub_portal_prod",
  })

  try {
    // Query: join child formdata rows with their parent formdata rows.
    const query = `
      SELECT
        child.id AS child_id,
        child.formid AS child_formid,
        child.titleoftheitem AS child_title,
        child.formstatusid AS child_status_id,
        child_status.description AS child_status,
        child.parentformdataid AS parent_form_reference_id,
        CONCAT('HD_', parent.id) AS parent_id,
        parent.formid AS parent_formid,
        parent.titleoftheitem AS parent_title,
        parent.formstatusid AS parent_status_id,
        parent_status.description AS parent_status,
        -- Extracted fields from parent.formdata JSON
        JSON_UNQUOTE(JSON_EXTRACT(parent.formdata, '$.\"description|of|the|item\"')) AS parent_description,
        JSON_UNQUOTE(JSON_EXTRACT(parent.formdata, '$.\"item|type\"')) AS parent_item_style,
        JSON_UNQUOTE(JSON_EXTRACT(parent.formdata, '$.\"exact|duration|of|the|item\"')) AS parent_exact_duration,
        JSON_UNQUOTE(JSON_EXTRACT(parent.formdata, '$.\"number|of|participants\"')) AS parent_number_of_participants,
        JSON_UNQUOTE(JSON_EXTRACT(parent.formdata, '$.\"choreographers|userid|list\"')) AS parent_choreographers_userid_list
      FROM formdata AS child
      LEFT JOIN formdata AS parent
        ON child.parentformdataid = parent.id
      LEFT JOIN formstatus AS child_status
        ON child.formstatusid = child_status.id
      LEFT JOIN formstatus AS parent_status
        ON parent.formstatusid = parent_status.id
      WHERE child.formid = 36
        AND child.formstatusid IN (8,9)
      ORDER BY child.id ASC
      LIMIT 100;
    `

    const [rows] = (await connection.execute(query)) as unknown as [unknown, unknown]

    // --- Process choreographer id lists: parse, trim, dedupe, and collect all unique ids ---
    const typedRowsForIds = (rows as Record<string, unknown>[]) ?? []
    // Keep an array of id-arrays per-row (preserve row order)
    const rowChoreographerIdArrays: string[][] = []
    const uniqueIdSet = new Set<string>()

    for (const r of typedRowsForIds) {
      const raw = r.parent_choreographers_userid_list ?? ""
      // normalize to string and split on commas and whitespace, filter empties
      const ids = String(raw)
        .split(/[,]+/)
        .map((s) => s.trim())
        .filter((s) => s !== "")
      // dedupe per-row
      const uniq = Array.from(new Set(ids))
      for (const id of uniq) {
        uniqueIdSet.add(id)
      }
      rowChoreographerIdArrays.push(uniq)
    }

    // Fetch user names for all unique ids in one query (if any)
    const userMap = new Map<string, string>() // id -> "Firstname Lastname"
    if (uniqueIdSet.size > 0) {
      const idsArray = Array.from(uniqueIdSet)
      const placeholders = idsArray.map(() => "?").join(",")
      const usersQuery = `SELECT id, firstname, lastname FROM user WHERE id IN (${placeholders})`
      const [userRows] = (await connection.execute(usersQuery, idsArray)) as unknown as [
        Record<string, unknown>[],
        unknown,
      ]
      for (const u of userRows) {
        const id = String(u.id)
        const fname = String(u.firstname ?? "").trim()
        const lname = String(u.lastname ?? "").trim()
        const full = [fname, lname].filter(Boolean).join(" ").trim()
        if (full) userMap.set(id, full)
        else userMap.set(id, id) // fallback to id if no name available
      }
    }

    // Normalize types: convert parent_number_of_participants to number|null
    const typedRows = (rows as Record<string, unknown>[]) ?? []

    const normalized = typedRows.map((r) => {
      const raw = r.parent_number_of_participants
      if (raw === null || raw === undefined || raw === "") {
        return { ...r, parent_number_of_participants: null }
      }
      const n = Number(raw)
      if (!Number.isFinite(n)) {
        return { ...r, parent_number_of_participants: null }
      }
      return { ...r, parent_number_of_participants: n }
    })

    // Map normalized rows to the desired item shape
    const items = normalized.map((r, idx) => {
      const parentIdRaw = String(r.parent_id ?? "")
      // convert "HD_<id>" -> "item-<id>"
      const itemId = parentIdRaw

      const name = (r.parent_title ?? null) as string | null
      const description = (r.parent_description ?? null) as string | null
      const duration = (r.parent_exact_duration ?? null) as string | null
      const teamSize = r.parent_number_of_participants as number | null

      // parent_item_style may encode TYPE or "TYPE/STYLE". Use a small heuristic:
      const rawTypeStyle = String(r.parent_item_style ?? "")
      // type is always PERFORMANCE; style is the rawTypeStyle (trimmed) or null if empty
      const type = "PERFORMANCE"
      const style = rawTypeStyle.trim() === "" ? null : rawTypeStyle.trim()

      // Build choreographer names for this row based on previously fetched userMap
      const idListForRow = rowChoreographerIdArrays[idx] ?? []
      const names = idListForRow
        .map((id) => userMap.get(id))
        .filter((n): n is string => typeof n === "string" && n.trim() !== "")
      const choreographers = names.length > 0 ? names.join(", ") : null

      return {
        itemId,
        name,
        description,
        type,
        style,
        teamSize,
        choreographers,
        state: "NONE",
        timer_start_time: null,
        duration,
      }
    })

    // Write mapped items to results.json in project root
    const outPath = path.join(process.cwd(), "results.json")
    await fs.writeFile(outPath, JSON.stringify(items, null, 2), "utf8")
  } catch (err) {
    console.error("Query failed:", err)
  } finally {
    await connection.end()
  }
}

main()
  .then(() => {
    // Success, nothing to do
  })
  .catch((err) => {
    console.error(err)
    // Optionally rethrow or handle error
  })
