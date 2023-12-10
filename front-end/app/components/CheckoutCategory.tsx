import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { removeFromCategoryBasket } from "../../redux/categorySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

interface Props {
    categories: Category[];
    id: string;
}

function CheckoutCategory({ id, categories }: Props) {
    const dispatch = useDispatch();

    const removeItemFromCategoryBasket = () => {
        dispatch(removeFromCategoryBasket(id));

        toast.error(`${categories[0].subcategoryName} removed from basket`, {
            position: "bottom-center",
        });
    };

    console.log(categories)

    return (
        <div className="flex flex-col gap-x-4 border-b border-gray-300 pt-3 pb-3 lg:flex-row items-center">
            <div className="flex-1 space-y-8">
                <div className="flex flex-col gap-x-16 text-xl lg:flex-row lg:text-2xl">
                    <h4 className="font-semibold lg:w-80">{categories[0].subcategoryName}</h4>
                </div>

                <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                    Show category details
                    <ChevronDownIcon className="h-6 w-6" />
                </p>
            </div>
            <div className="flex flex-col items-end space-y-4">
                <button
                    onClick={removeItemFromCategoryBasket}
                    className="text-blue-500 hover:underline"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CheckoutCategory;