import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCategoryBasket } from "@/redux/categorySlice";
import toast from "react-hot-toast";

interface Props {
    category: Category;
}

function Category({ category }: Props) {
    const dispatch = useDispatch();

    const addItemToCategoryBasket = () => {
        dispatch(addToCategoryBasket(category));

        toast.success(`${category.subcategoryId} added to basket`, {
            position: "bottom-center",
        });
    };


    return (
        <div className="flex h-fit w-[20px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[240px] md:w-[240px] md:p-10">
            <div className="flex flex-1 items-center justify-between space-x-3">
                <div className="space-y-2 text-m text-white md:text-m">
                    <p>{category.subcategoryName}</p>
                </div>

                <div
                    className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]"
                    onClick={addItemToCategoryBasket}
                >
                    <PlusIcon className="h-8 w-8 text-white" />
                </div>
            </div>
        </div>
    );
}

export default Category;