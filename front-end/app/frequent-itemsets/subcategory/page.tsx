"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategoryBasketItems } from "@/redux/categorySlice";
import CheckoutCategory from "@/app/components/CheckoutCategory";
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Chip } from "@nextui-org/react";

function FrequentCategorySet() {
    const columns = [
        {
            key: "SubcategorySetIDs",
            label: "SUBCATEGORY SET IDs",
        },
        {
            key: "SubcategorySet",
            label: "SUBCATEGORY SET",
        },
        {
            key: "Confidence",
            label: "CONFIDENCE",
        },
    ];
    const categories = useSelector(selectCategoryBasketItems);
    const [groupedCategoriesInBasket, setGroupedCategoriesInBasket] = useState(
        {} as { [key: string]: Category[] }
    );

    useEffect(() => {
        const groupedCategories = categories.reduce((results, item) => {
            (results[item.subcategoryId] = results[item.subcategoryId] || []).push(item);
            return results;
        }, {} as { [key: string]: Category[] });

        setGroupedCategoriesInBasket(groupedCategories);
    }, [categories]);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/frequent-itemsets/subcategory', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "subcategoryList": categories.length > 0 ? (categories.map(item => item.subcategoryId)) : [],
            }), // body data type must match "Content-Type" header
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(data.length / rowsPerPage);

    const categories_1 = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    const classNames = React.useMemo(
        () => ({
            wrapper: ["border-[2px]"],
            th: ["text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "SubcategorySetIDs":
                return (
                    <div>
                        {cellValue.map((item) => (<Chip className="capitalize" size="sm" variant="flat">
                            {item}
                        </Chip>))}
                    </div>
                );
            case "SubcategorySet":
                return (
                    <div>
                        {cellValue.map((item) => (<Chip className="capitalize" size="sm" variant="flat">
                            {item}
                        </Chip>))}
                    </div>
                );
            case "Confidence":
                return (
                    <div className="flex flex-col">
                        {cellValue.toFixed(4)}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="min-h-screen overflow-hidden">
            <Header />
            <main className="mx-auto max-w-5xl pb-24">
                <h1 className="px-5 my-4 text-3xl font-semibold lg:text-4xl">
                    Frequent category sets
                </h1>

                {categories.length > 0 && (
                    <div className="mx-5 md:mx-8">
                        {Object.entries(groupedCategoriesInBasket).map(([key, categories]) => (
                            <CheckoutCategory key={key} categories={categories} id={categories[0]} />
                        ))}
                    </div>
                )}
                <div>
                    <Table
                        aria-label="Example table with dynamic content"
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    classNames={{
                                        cursor: "bg-foreground text-background",
                                    }}
                                    showControls
                                    showShadow
                                    color="default"
                                    variant="light"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        }
                        bottomContentPlacement="outside"
                        classNames={classNames}
                    >
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={categories_1}>
                            {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    );
}

export default FrequentCategorySet;