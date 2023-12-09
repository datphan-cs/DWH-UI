import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
// import { urlFor } from "../sanity";
import CurrencyFormat from 'react-currency-format';
import { removeFromBasket } from "../../redux/basketSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface Props {
    items: Product[];
    id: string;
}

function CheckoutProduct({ id, items }: Props) {
    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));

        toast.error(`${items[0].productName} removed from basket`, {
            position: "bottom-center",
        });
    };

    return (
        <div className="flex flex-col gap-x-4 border-b border-gray-300 pt-3 pb-3 lg:flex-row items-center">
            <div className="flex-1 space-y-8">
                <div className="flex flex-col gap-x-16 text-xl lg:flex-row lg:text-2xl">
                    <h4 className="font-semibold lg:w-80">{items[0].productName}</h4>
                    <p className="flex items-center gap-x-1 font-semibold">
                        {items.length}
                    </p>
                </div>

                <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                    Show product details
                    <ChevronDownIcon className="h-6 w-6" />
                </p>
            </div>
            <div className="flex flex-col items-end space-y-4">
                <h4 className="text-xl font-semibold lg:text-2xl">
                    ${Number(items[0].price) * items.length}
                </h4>
                <button
                    onClick={removeItemFromBasket}
                    className="text-blue-500 hover:underline"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CheckoutProduct;