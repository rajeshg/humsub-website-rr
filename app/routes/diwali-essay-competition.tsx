import { Badge } from "~/components/ui/badge"
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
              src="/assets/Hum-Sub-Diwali-Essay-Competition-2025.jpeg"
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

          {/* Empowerly Prizes & Partnership Section */}
          <div className="w-full max-w-5xl mb-12 bg-gradient-to-br from-blue-500/5 to-blue-600/10 rounded-3xl border border-blue-200/50 dark:border-blue-800/30 shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-shrink-0 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  <img
                    src="/assets/sponsors/empowerly.png"
                    alt="Empowerly Logo"
                    className="relative w-32 h-32 md:w-40 md:h-40 object-contain rounded-2xl shadow-xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-900 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                      Prizes Sponsored by Empowerly
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-black text-blue-900 dark:text-blue-200">Exclusive Prizes</h2>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-500 uppercase tracking-widest">1st Place</div>
                      <div className="text-4xl font-black text-green-600 dark:text-green-400 leading-none mt-1">
                        $500
                      </div>
                    </div>
                    <div className="h-10 w-px bg-blue-200 dark:bg-blue-800 self-end mb-1" />
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-500 uppercase tracking-widest">2nd Place</div>
                      <div className="text-4xl font-black text-yellow-600 dark:text-yellow-400 leading-none mt-1">
                        $250
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                    Empowerly proudly partners with{" "}
                    <span className="text-blue-700 dark:text-blue-400 font-black">Hum Sub</span> to uplift student
                    voices and empower the next generation through education.
                  </p>
                  <a
                    href="https://empowerly.com"
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit empowerly.com
                    <span className="text-lg">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Entry Form Section */}
          <div className="w-full max-w-5xl text-center py-12 border-t border-dashed border-muted">
            <h3 className="text-3xl font-black text-primary mb-4">Applications Closed</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The deadline for submissions was September 21, 2025. We were thrilled by the level of participation and
              look forward to announcing the winners!
            </p>
          </div>

          {/* Footer */}
          <footer className="w-full max-w-5xl mx-auto py-10 bg-muted/20 rounded-3xl border border-muted/50">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <img
                src="/assets/25yr-logo.png"
                alt="Hum Sub Logo"
                className="w-28 h-28 rounded-full object-contain shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="hidden md:block text-3xl font-light text-muted-foreground/30">×</div>
              <img
                src="/assets/sponsors/empowerly.png"
                alt="Empowerly Logo"
                className="w-32 h-32 md:w-40 md:h-40 p-4 rounded-3xl object-contain shadow-xl bg-white/50 dark:bg-black/50 backdrop-blur grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
