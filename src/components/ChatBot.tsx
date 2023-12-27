"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export function ChatBot() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm bg-red-300">
                    <DrawerHeader>
                        <DrawerTitle>Title</DrawerTitle>
                        <DrawerDescription>
                            Description in here
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                    Messages
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    Description
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 h-[120px]">Data</div>
                    </div>
                    <DrawerFooter>
                        Footer
                        <DrawerClose asChild>
                            <Button variant="outline">Close Drawer</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
