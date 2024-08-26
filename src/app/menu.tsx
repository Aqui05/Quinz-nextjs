// Ajoutez ceci en haut du fichier pour indiquer que ce composant est un Client Component
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, CardBody, Image } from "@nextui-org/react";
import { fetchMenus } from "./services/api";

// Définition de l'interface
interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    availability: boolean;
    image: string;
}

export default function Menus() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMenus() {
            setLoading(true);
            try {
                const data = await fetchMenus();
                setMenus(data);
            } catch (error) {
                console.error("Failed to load menus", error);
                setError("Failed to load menus. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        loadMenus();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {menus.map((item, index) => (
                <Card
                    className="py-4"
                    shadow="sm"
                    key={index}
                    isPressable
                    onPress={() => console.log(`${item.name} pressed`)}
                >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{item.category}</p>
                        <small className="text-default-500">${item.price}</small>
                        <h4 className="font-bold text-large">{item.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.name}
                            className="object-cover rounded-xl"
                            src={item.image}
                            width={270}
                        />
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
