import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export default function DiwaliEssayCompetition() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Diwali Essay Competition | Hum Sub</title>
      <div className="not-prose min-h-screen">
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">
              Diwali Essay Competition
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Celebrate Diwali by sharing your unique perspective and thoughts through the art of writing!
            </p>
          </div>

          {/* Flyer Image */}
          <figure className="w-full max-w-4xl mb-12 shadow-2xl rounded-3xl overflow-hidden border bg-muted/5 flex items-center justify-center p-6">
            <img
              src="/assets/Hum-Sub-Diwali-Essay-Competition-2026.png"
              alt="Hum Sub - Essay Competition Flyer"
              className="max-w-full h-auto object-contain mx-auto transition-transform duration-500 hover:scale-[1.02]"
            />
          </figure>

          {/* Contest Details & Rubric */}
          <Card className="w-full max-w-5xl mb-12 shadow-lg border-primary/10 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-2xl font-bold text-primary">Contest Details & Rubric</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <iframe
                  title="Hum Sub - Diwali Essay Competition Rubric"
                  sandbox="allow-scripts allow-forms"
                  className="w-full h-[500px] border-0"
                  src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRWgsmmf3lUfAi-EDu13xc9qS4FNu-6L55nRGbP6mQZK7BZ-4oMNL2scXtnoDCbzHRUTfADhaMk65Gn/pubhtml?widget=true&amp;headers=false"
                />
              </div>
            </CardContent>
          </Card>

          {/* Prizes */}
          <div className="w-full max-w-5xl mb-12 text-center rounded-3xl border border-muted/50 bg-muted/5 py-8 px-6">
            <h2 className="text-3xl font-black text-primary mb-6">Prizes</h2>
            <div className="flex items-center justify-center gap-10">
              <div className="text-center">
                <div className="text-sm font-bold text-primary uppercase tracking-widest">1st Place</div>
                <div className="text-4xl font-black text-green-600 dark:text-green-400 leading-none mt-1">$500</div>
              </div>
              <div className="h-10 w-px bg-muted self-end mb-1" />
              <div className="text-center">
                <div className="text-sm font-bold text-primary uppercase tracking-widest">2nd Place</div>
                <div className="text-4xl font-black text-yellow-600 dark:text-yellow-400 leading-none mt-1">$250</div>
              </div>
            </div>
          </div>

          {/* Entry Form Section */}
          <div className="w-full max-w-5xl text-center py-12 border-t border-dashed border-muted">
            <h3 className="text-3xl font-black text-primary mb-4">Submit Your Entry</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The deadline for submissions is September 15, 2026.
            </p>
            <div className="w-full max-w-3xl mx-auto overflow-x-auto rounded border border-gray-200 dark:border-gray-700">
              <iframe
                title="Hum Sub - Diwali Essay Competition Form"
                sandbox="allow-scripts allow-forms"
                className="w-full min-h-[1650px] border-0"
                src="https://form.jotform.com/242075159180051"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
