import { Link, Outlet } from "react-router";
import { Menu } from "lucide-react";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
    navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";
import { ThemeToggle } from "~/components/ui/theme-toggle";

const ListItem = React.forwardRef<
    React.ComponentRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ href, className, title, children, ...props }, ref) => {
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
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="p-4 bg-card">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">
                        <img
                            src="/assets/25yr-logo.png"
                            alt="hum sub logo"
                            width={90}
                        />
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
                                            <ListItem title={"About Us"} href={"/about"}>
                                                Learn more about us.
                                            </ListItem>
                                            <ListItem title={"Our Team"} href={"/our-team"}>
                                                Meet our team.
                                            </ListItem>
                                            <ListItem
                                                title={"Sponsors & Partners"}
                                                href={"/our-sponsors"}
                                            >
                                                Learn more about our sponsors and partners.
                                            </ListItem>
                                            <ListItem title={"Gallery"} href={"/gallery"}>
                                                View pictures and videos from past events.
                                            </ListItem>
                                            <ListItem title={"Cultural FAQ"} href={"/cultural-faq"}>
                                                Frequently asked questions about our events.
                                            </ListItem>
                                            <ListItem title={"Volunteer"} href={"/volunteer"}>
                                                Learn more about volunteering with Hum Sub.
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/gallery" className={cn(navigationMenuTriggerStyle(), "text-foreground")}>
                                        Gallery
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
                                            <ListItem title={"Youth Ambassador"} href={"/youth-ambassador"}>
                                                Learn more about the Youth Ambassador program.
                                            </ListItem>
                                            <ListItem title={"Youth Achievement Award"} href={"/yaa"}>
                                                Learn more about the Youth Achievement Award.
                                            </ListItem>
                                            <ListItem title={"Essay Competition"} href={"/diwali-essay-competition"}>
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
                        <ThemeToggle />

                        {/* Mobile Navigation Button */}
                        <Sheet>
                            <SheetTrigger className="md:hidden">
                                <Menu className="h-6 w-6" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 bg-background text-foreground overflow-y-auto gap-1">
                                <SheetHeader className="text-left py-2">
                                    <SheetTitle>Menu</SheetTitle>
                                    <SheetDescription>Navigate through the app.</SheetDescription>
                                </SheetHeader>
                                <nav className="mt-2 flex flex-col space-y-2">
                                    <SheetTrigger asChild>
                                        <Link to="/" className="block py-2 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                            Home
                                        </Link>
                                    </SheetTrigger>
                                    
                                    {/* About Us Section */}
                                    <div className="space-y-1">
                                        <h6 className="px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">About Us</h6>
                                        <div className="pl-2 space-y-0.5">
                                            <SheetTrigger asChild>
                                                <Link to="/about" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    About
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/our-team" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Our Team
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/our-sponsors" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Sponsors & Partners
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/gallery" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Gallery
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/cultural-faq" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Cultural FAQ
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/volunteer" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Volunteer
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/contact-us" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Contact
                                                </Link>
                                            </SheetTrigger>
                                        </div>
                                    </div>
                                    
                                    <SheetTrigger asChild>
                                        <Link to="/blog" className="block py-2 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                            Blog
                                        </Link>
                                    </SheetTrigger>
                                    
                                    {/* Programs Section */}
                                    <div className="space-y-1">
                                        <h6 className="px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Programs</h6>
                                        <div className="pl-2 space-y-0.5">
                                            <SheetTrigger asChild>
                                                <Link to="/youth-ambassador" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Youth Ambassador
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/yaa" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Youth Achievement Award
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/discover-india-series" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Discover India Series
                                                </Link>
                                            </SheetTrigger>
                                            <SheetTrigger asChild>
                                                <Link to="/diwali-essay-competition" className="block py-1.5 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                                    Diwali Essay Competition
                                                </Link>
                                            </SheetTrigger>
                                        </div>
                                    </div>
                                    
                                    <SheetTrigger asChild>
                                        <Link to="/events" className="block py-2 px-4 hover:bg-secondary hover:text-secondary-foreground rounded-md transition-colors">
                                            Events
                                        </Link>
                                    </SheetTrigger>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            <main className="flex-grow relative bg-gradient-to-br from-blue-400/10 via-purple-500/10 to-pink-500/10 dark:from-blue-700/10 dark:via-purple-800/10 dark:to-pink-800/10">
                <div className="relative z-10 prose dark:prose-invert max-w-7xl mx-auto py-4 px-2 ">
                    <Outlet />
                </div>
            </main>
            <footer className="p-6 mt-auto bg-card text-card-foreground">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start gap-8">
                    <div className="flex flex-col items-start">
                        <a href="/" className="mb-2">
                            <img
                                src="/assets/25yr-logo.png"
                                alt="hum sub logo"
                                width={90}
                            />
                        </a>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            Hum Sub Inc.
                            <br />
                            Serving the community since 2000.
                        </p>
                    </div>
                    <div className="flex flex-col items-start">
                        <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Social</h6>
                        <div className="flex space-x-4">
                            <a
                                href="https://twitter.com/HumSubInc"
                                target="_blank"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current"
                                >
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@HumSubInc"
                                target="_blank"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current"
                                >
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/humsubinc"
                                target="_blank"
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current"
                                >
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}