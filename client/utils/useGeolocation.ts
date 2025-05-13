"use client";
import { useEffect, useState } from "react";

const useGeolocation = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            console.error("Geolocation not supported");
        }
    }, []);

    return location;
};

export default useGeolocation;
