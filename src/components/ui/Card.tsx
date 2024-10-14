"use client";
import Image from "next/image";
import Button from "./Button";
import { memo } from "react";

const Card = memo(({
    title, 
    description, 
    imageLink, 
    purchasedOn, 
    buttonTitle, 
    onClick
}: {
    title: string;
    description: string;
    imageLink?: string;
    purchasedOn?: string;
    buttonTitle?: string;
    onClick?: () => void;
}) => {
    return (
        <div className="max-w-sm rounded-lg shadow">
            <div>
                {imageLink && <Image className="rounded-t-lg" src={imageLink} alt="" />}
            </div>
            <div className="p-5 pb-0">
                <>
                    <h1 className="mb-2 text-2xl font-bold text-blue-400">{title}</h1>
                    <p className="mb-3 font-normal">{description}</p>
                    {purchasedOn && <p className="mb-2 text-sm">Purchased On: {purchasedOn}</p>}
                </>
                <div className="pt-2 pb-4">
                    {buttonTitle && <Button title={buttonTitle} onClick={onClick} />}
                </div>
            </div>
        </div>
    )
});
Card.displayName = "Card";

export default Card;