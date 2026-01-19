import { Menu, ExternalLink, Twitter, Youtube, Instagram, Facebook } from "lucide-react"
import type React from "react"
import { Link, Outlet } from "react-router"
import CountdownHeader from "~/components/countdown-header"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { Separator } from "~/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "~/components/ui/sheet"
import { ThemeToggle } from "~/components/ui/theme-toggle"
import { cn } from "~/lib/utils"

const diwaliDate = new Date(2025, 9, 11, 9, 0, 0)

function ListItem({
  ref,
  href,
  className,
  title,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { ref?: React.RefObject<React.ComponentRef<"a"> | null> }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href ?? "#"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export function PortalButton() {
  return (
    <a href="https://portal.humsub.org" target="_blank" rel="noreferrer noopener">
      <button
        type="button"
        className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
      >
        <ExternalLink className="mr-2" />
        <span>Portal</span>
      </button>
    </a>
  )
}

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <img src="/assets/humsub-logo.png" alt="hum sub logo" width={60} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(navigationMenuTriggerStyle(), "text-foreground")}>
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground">About</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-popover text-popover-foreground shadow-lg rounded-md border">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem title="About Us" href="/about">
                        Learn more about us.
                      </ListItem>
                      <ListItem title="Our Team" href="/our-team">
                        Meet our team.
                      </ListItem>
                      {/*
											<ListItem title="Sponsors & Partners" href="/our-sponsors">
												Learn more about our sponsors and partners.
											</ListItem>
											*/}
                      <ListItem title="Gallery" href="/gallery">
                        View pictures and videos from past events.
                      </ListItem>
                      <ListItem title="Cultural FAQ" href="/cultural-faq">
                        Frequently asked questions about our events.
                      </ListItem>
                      <ListItem title="Volunteer" href="/volunteer">
                        Learn more about volunteering with Hum Sub.
                      </ListItem>

                      {/* Added submenu items */}
                      <ListItem title="Membership" href="/membership">
                        Join Hum Sub — priority Diwali seating and member perks.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/our-sponsors" className={cn(navigationMenuTriggerStyle(), "text-foreground")}>
                    Sponsors
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/blog" className={cn(navigationMenuTriggerStyle(), "text-foreground")}>
                    Blog
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/events" className={cn(navigationMenuTriggerStyle(), "text-foreground")}>
                    Events
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground">Youth Programs</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-popover text-popover-foreground shadow-lg rounded-md border">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem title="Youth Ambassador" href="/youth-ambassador">
                        Learn more about the Youth Ambassador program.
                      </ListItem>
                      <ListItem title="Youth Achievement Award" href="/yaa">
                        Learn more about the Youth Achievement Award.
                      </ListItem>
                      <ListItem title="Essay Competition" href="/diwali-essay-competition">
                        Learn more about the Diwali Essay Competition.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact-us" className={cn(navigationMenuTriggerStyle(), "text-foreground")}>
                    Contact Us
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center space-x-2 relative">
            <PortalButton />
            <ThemeToggle />

            {/* Mobile Navigation Button */}
            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-background text-foreground overflow-y-auto p-0">
                <SheetHeader className="text-left p-4 border-b">
                  <img src="/assets/humsub-logo.png" alt="Hum Sub Logo" width={40} className="mb-2" />
                  <SheetTitle>Hum Sub</SheetTitle>
                  <SheetDescription>Explore our programs, events, and resources</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 p-2">
                  <SheetTrigger asChild>
                    <Link
                      to="/"
                      className="block py-2 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors text-lg font-medium"
                    >
                      Home
                    </Link>
                  </SheetTrigger>
                  <Separator className="my-1" />
                  {/* About Us Section */}
                  <div className="space-y-1 pt-1">
                    <h6 className="px-3 py-1 font-semibold text-muted-foreground">About Us</h6>
                    <div className="pl-3 space-y-0.5">
                      <SheetTrigger asChild>
                        <Link
                          to="/about"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          About
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/our-team"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Our Team
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/gallery"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Gallery
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/cultural-faq"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Cultural FAQ
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/volunteer"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Volunteer
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/contact-us"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Contact
                        </Link>
                      </SheetTrigger>

                      <SheetTrigger asChild>
                        <Link
                          to="/membership"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Membership
                        </Link>
                      </SheetTrigger>
                    </div>
                  </div>
                  <Separator className="my-1" />
                  <SheetTrigger asChild>
                    <Link
                      to="/our-sponsors"
                      className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                    >
                      Sponsors
                    </Link>
                  </SheetTrigger>
                  <Separator className="my-1" />
                  <SheetTrigger asChild>
                    <Link
                      to="/events"
                      className="block py-2 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors text-lg font-medium"
                    >
                      Events
                    </Link>
                  </SheetTrigger>
                  <Separator className="my-1" />
                  {/* Programs Section */}
                  <div className="space-y-1 pt-1">
                    <h6 className="px-3 py-1 font-semibold text-muted-foreground">Programs</h6>
                    <div className="pl-3 space-y-0.5">
                      <SheetTrigger asChild>
                        <Link
                          to="/youth-ambassador"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Youth Ambassador
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/yaa"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Youth Achievement Award
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/discover-india-series"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Discover India Series
                        </Link>
                      </SheetTrigger>
                      <SheetTrigger asChild>
                        <Link
                          to="/diwali-essay-competition"
                          className="block py-1.5 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors"
                        >
                          Diwali Essay Competition
                        </Link>
                      </SheetTrigger>
                    </div>
                  </div>
                  <Separator className="my-1" />
                  <SheetTrigger asChild>
                    <Link
                      to="/blog"
                      className="block py-2 px-3 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors text-lg font-medium"
                    >
                      Blog
                    </Link>
                  </SheetTrigger>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-grow relative bg-gradient-to-br from-blue-400/10 via-purple-500/10 to-pink-500/10 dark:from-blue-700/10 dark:via-purple-800/10 dark:to-pink-800/10">
        <CountdownHeader eventDate={diwaliDate} />

        <div className="relative z-10 max-w-7xl mx-auto py-2 px-4 ">
          <Outlet />
        </div>
      </main>
      <footer className="px-4 py-2 mt-auto">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start gap-8">
          <div className="flex flex-col items-start">
            <Link to="/" className="mb-2">
              <img src="/assets/humsub-logo.png" alt="hum sub logo" width={60} />
            </Link>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Hum Sub Inc.
              <br />
              Serving the community since 2000.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Social</h6>
            <div className="flex space-x-4">
              <a href="https://x.com/HumSubInc" target="_blank" rel="noreferrer noopener">
                <Twitter />
              </a>
              <a href="https://www.youtube.com/@HumSubInc" target="_blank" rel="noreferrer noopener">
                <Youtube />
              </a>
              <a href="https://www.instagram.com/humsubinc/" target="_blank" rel="noreferrer noopener">
                <Instagram />
              </a>
              <a href="https://www.facebook.com/humsubinc" target="_blank" rel="noreferrer noopener">
                <Facebook />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-5WQKXND2YV" />

      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: We are using this to set the gtag script inline
        dangerouslySetInnerHTML={{
          __html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){window.dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-5WQKXND2YV');
					`,
        }}
      />
    </div>
  )
}
