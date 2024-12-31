"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/hooks/WalletConnectHook"
import { truncateAddress } from "@/lib/truncateAdderss"
import Link from "next/link"

import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { Moon, MoonIcon, Sun } from "lucide-react"

const SidebarMenuiItems = [
    {
        title: "Home",
        url: "/",
        icon: "fa-duotone fa-thin fa-house",
    },
    {
        title: "Create NFT",
        url: "/create",
        icon: "fa-duotone fa-thin fa-paintbrush-fine",
    },
    {
        title: "Marketplace",
        url: "/marketplace",
        icon: "fa-duotone fa-light fa-store",
    },
    {
        title: "My NFTs",
        url: "/my-nfts",
        icon: "fa-duotone fa-thin fa-image",
    },
    {
        title: "Sell NFT",
        url: "/sell",
        icon: "fa-duotone fa-solid fa-money-bill-transfer",
    },
];

const dropdownMenuItems = [
    {
        title: "Account",
        url: "/profile",
        icon: "fa-duotone fa-light fa-user",
    },
    {
        title: "My NFTs",
        url: "/my-nfts",
        icon: "fa-duotone fa-thin fa-image",
    },
    {
        title: "Help & Contact",
        url: "/help",
        icon: "fa-duotone fa-thin fa-circle-info",
    },
    {
        title: "Log Out",
        url: "/logout",
        icon: "fa-duotone fa-light fa-right-from-bracket",
    },
];

export function AppSidebar() {

    const { walletAddress } = useWallet();
    const { setTheme } = useTheme()


    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SidebarMenuiItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <i className={item.icon}></i>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>


            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="wrap">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="flex SidebarMenuiItems-center justify-between py-5">
                                        <span className="flex items-center space-x-2">
                                            <i className="fa fa-user" aria-hidden="true" />
                                            <span>{truncateAddress(walletAddress) || "Not connected"}</span>
                                        </span>
                                        <i className="fa-sharp-duotone text-zinc-300 fa-regular fa-chevrons-up" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>{truncateAddress(walletAddress) || "Not connected"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {dropdownMenuItems.map((item, index) => (
                            <DropdownMenuItem key={index}>
                                <Link href={item.url} className="flex gap-2 p-[2px] SidebarMenuiItems-center justify-start w-full">
                                    <i className={item.icon}></i>
                                    <span>{item.title}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <div className="theme-wrap flex justify-between">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

            </SidebarFooter>
        </Sidebar>
    )
}
