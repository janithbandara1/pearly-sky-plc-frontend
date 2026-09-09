"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
    LucideIcon,
    LucideSalad,
    Disc,
    Sparkles,
    Droplet,
    ShieldAlert,
    Wind,
    Layers,
    Flame,
    Wrench,
    SprayCan,
    ShieldCheck,
    GlassWater,
    Brush,
    Zap,
    Pipette,
    FlaskConical,
    Check,
    Plus,
    Minus,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

// Interfaces
interface ProductItem {
    id: string;
    name: string;
    unitPrice: number;
    Icon: LucideIcon;
}

interface QuantitiesState {
    [key: string]: number;
}

interface CarouselSectionProps {
    title: string;
    items: ProductItem[];
    quantities: QuantitiesState;
    onUpdateQuantity: (id: string, qty: number) => void;
    onToggleCheck: (id: string) => void;
}

const PRODUCT_NAME_KEYS: Record<string, TranslationKey> = {
    "Commercial-Grade Vacuum Cleaners": "prodItemVacuumCleaners",
    "Floor Polishers / Buffers": "prodItemFloorPolishers",
    "Carpet Cleaners / Extractors": "prodItemCarpetCleaners",
    "Mops and Buckets Set": "prodItemMopsBuckets",
    "High-Pressure Washers": "prodItemPressureWashers",
    "Industrial Air Blowers": "prodItemAirBlowers",
    "Steam Vapor Cleaners": "prodItemSteamVaporCleaners",
    "Microfiber Cleaning Kits": "prodItemMicrofiberKits",
    "Safety & PPE Gear Kits": "prodItemPpeGearKits",
    "All-Purpose Cleaners": "prodItemAllPurposeCleaners",
    "Hospital-Grade Disinfectants": "prodItemHospitalDisinfectants",
    "Streak-Free Glass Cleaners": "prodItemGlassCleaners",
    "Floor Cleaners & Strippers": "prodItemFloorCleaners",
    "Heavy-Duty Degreasers": "prodItemHeavyDegreasers",
    "Sanitizing Sprays": "prodItemSanitizingSprays",
    "Specialized Odor Neutralizers": "prodItemOdorNeutralizers",
};

// Data Arrays
const EQUIPMENTS: ProductItem[] = [
    { id: "eq1", name: "Commercial-Grade Vacuum Cleaners", unitPrice: 15.0, Icon: LucideSalad },
    { id: "eq2", name: "Floor Polishers / Buffers", unitPrice: 25.0, Icon: Disc },
    { id: "eq3", name: "Carpet Cleaners / Extractors", unitPrice: 30.0, Icon: Sparkles },
    { id: "eq4", name: "Mops and Buckets Set", unitPrice: 8.0, Icon: Droplet },
    { id: "eq5", name: "High-Pressure Washers", unitPrice: 45.0, Icon: ShieldAlert },
    { id: "eq6", name: "Industrial Air Blowers", unitPrice: 18.0, Icon: Wind },
    { id: "eq7", name: "Steam Vapor Cleaners", unitPrice: 35.0, Icon: Flame },
    { id: "eq8", name: "Microfiber Cleaning Kits", unitPrice: 10.0, Icon: Layers },
    { id: "eq9", name: "Safety & PPE Gear Kits", unitPrice: 12.0, Icon: Wrench },
];

const CHEMICALS: ProductItem[] = [
    { id: "ch1", name: "All-Purpose Cleaners", unitPrice: 5.0, Icon: SprayCan },
    { id: "ch2", name: "Hospital-Grade Disinfectants", unitPrice: 8.5, Icon: ShieldCheck },
    { id: "ch3", name: "Streak-Free Glass Cleaners", unitPrice: 4.0, Icon: GlassWater },
    { id: "ch4", name: "Floor Cleaners & Strippers", unitPrice: 12.0, Icon: Brush },
    { id: "ch5", name: "Heavy-Duty Degreasers", unitPrice: 9.5, Icon: Zap },
    { id: "ch6", name: "Sanitizing Sprays", unitPrice: 6.0, Icon: Pipette },
    { id: "ch7", name: "Specialized Odor Neutralizers", unitPrice: 7.5, Icon: FlaskConical },
];

// Item-by-Item Scroll Snap Carousel
const CarouselSection: React.FC<CarouselSectionProps> = ({
    title,
    items,
    quantities,
    onUpdateQuantity,
    onToggleCheck,
}) => {
    const { translate } = useLanguage();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
    });
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", () => {
            setScrollSnaps(emblaApi.scrollSnapList());
            setSelectedIndex(emblaApi.selectedScrollSnap());
        });
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const handleToggle = (id: string) => {
        onToggleCheck(id);
    };

    const handleUpdateQty = (id: string, qty: number) => {
        onUpdateQuantity(id, qty);
    };

    return (
        <div className="mb-10">
            <h3 className="text-xs font-bold tracking-widest text-slate-300 uppercase mb-4">
                {title}
            </h3>

            {/* Embla Swipable Container */}
            <div
                ref={emblaRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing select-none pb-2"
            >
                <div className="flex gap-4">
                    {items.map((item) => {
                        const qty = quantities[item.id] || 0;
                        const isSelected = qty > 0;
                        const IconComponent = item.Icon;
                        const totalPrice = qty * item.unitPrice;
                        const key = PRODUCT_NAME_KEYS[item.name];
                        const translatedName = key ? translate(key) : item.name;

                        return (
                            <div
                                key={item.id}
                                className="shrink-0 grow-0 basis-full sm:basis-[calc(50%-8px)] lg:basis-[calc(25%-12px)] min-w-0"
                            >
                                <div
                                    className={`relative bg-[#FFFDF4] rounded-2xl p-5 flex flex-col items-center justify-between text-center min-h-[260px] border-2 transition-all duration-200 select-none ${isSelected
                                        ? "border-[#A98B4B] shadow-[0_0_15px_rgba(169,139,75,0.25)] bg-white"
                                        : "border-transparent"
                                        }`}
                                >
                                    {/* Checkbox Badge */}
                                    <button
                                        type="button"
                                        onClick={() => handleToggle(item.id)}
                                        className={`absolute top-4 left-4 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${isSelected
                                            ? "bg-[#A98B4B] border-[#A98B4B] text-white"
                                            : "border-slate-300 bg-transparent hover:border-[#A98B4B]"
                                            }`}
                                    >
                                        {isSelected && <Check size={18} strokeWidth={3} />}
                                    </button>

                                    {/* Icon */}
                                    <div className="mt-2 text-[#A98B4B]">
                                        <IconComponent size={44} strokeWidth={1.5} />
                                    </div>

                                    {/* Product Title */}
                                    <h4 className="font-bold text-[#121E2D] text-sm leading-snug my-2 min-h-[40px] flex items-center justify-center">
                                        {translatedName}
                                    </h4>

                                    {/* Stepper Controls */}
                                    <div className="w-full max-w-[160px] h-10 border border-[#A98B4B] rounded-full flex items-center justify-between px-1 bg-white my-2">
                                        <button
                                            type="button"
                                            onClick={() => handleUpdateQty(item.id, Math.max(0, qty - 1))}
                                            className="w-8 h-8 rounded-full bg-[#A98B4B] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={16} strokeWidth={2.5} />
                                        </button>

                                        <span className="font-bold text-[#121E2D] text-sm px-2">
                                            {qty}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => handleUpdateQty(item.id, qty + 1)}
                                            className="w-8 h-8 rounded-full bg-[#A98B4B] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={16} strokeWidth={2.5} />
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <span className="text-xs font-semibold text-slate-500">
                                        € {totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dynamic Navigation Dots */}
            {scrollSnaps.length > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    {scrollSnaps.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => scrollTo(idx)}
                            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === idx
                                ? "w-6 bg-[#A98B4B]"
                                : "w-2.5 bg-slate-600 hover:bg-slate-500"
                                }`}
                            aria-label={`Go to section ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Main Export Component
export default function ProductSelector(): React.JSX.Element {
    const { translate } = useLanguage();
    const [quantities, setQuantities] = useState<QuantitiesState>({});

    const updateQuantity = (id: string, newQty: number): void => {
        setQuantities((prev) => ({
            ...prev,
            [id]: newQty,
        }));
    };

    const toggleCheck = (id: string): void => {
        setQuantities((prev) => {
            const currentQty = prev[id] || 0;
            return {
                ...prev,
                [id]: currentQty > 0 ? 0 : 1,
            };
        });
    };

    return (
        <div className="min-h-screen bg-[#0A1424] rounded-2xl text-white p-4 md:p-8 flex justify-center items-center">
            <div className="w-full max-w-6xl  rounded-2xl p-6 md:p-10 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#A98B4B] tracking-wide uppercase">
                        {translate("prodSuppTitle")}
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        {translate("prodSuppSubtitle")}
                    </p>
                </div>

                {/* Equipment Carousel */}
                <CarouselSection
                    title={translate("prodSuppEquipment")}
                    items={EQUIPMENTS}
                    quantities={quantities}
                    onUpdateQuantity={updateQuantity}
                    onToggleCheck={toggleCheck}
                />

                {/* Chemicals Carousel */}
                <CarouselSection
                    title={translate("prodSuppChemicals")}
                    items={CHEMICALS}
                    quantities={quantities}
                    onUpdateQuantity={updateQuantity}
                    onToggleCheck={toggleCheck}
                />
            </div>
        </div>
    );
}