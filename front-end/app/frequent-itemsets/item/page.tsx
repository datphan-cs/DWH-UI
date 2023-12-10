"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/app/components/Button";
import { selectBasketItems, selectBasketTotal } from "@/app/../redux/basketSlice";
import CheckoutProduct from "@/app/components/CheckoutProduct";
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Chip, Tooltip, } from "@nextui-org/react";

function FrequentItemsets() {
    const columns = [
        {
            key: "Itemset",
            label: "ITEMSET",
        },
        {
            key: "Confidence",
            label: "CONFIDENCE",
        },
    ];
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
        {} as { [key: string]: Product[] }
    );

    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.productId] = results[item.productId] || []).push(item);
            return results;
        }, {} as { [key: string]: Product[] });

        setGroupedItemsInBasket(groupedItems);
    }, [items]);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/frequent-itemsets/item', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "itemList": items.length > 0 ? (items.map(item => item.productId)) : [],
                "pageBy": 20
            }), // body data type must match "Content-Type" header
        })
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(data.length / rowsPerPage);

    const items_1 = React.useMemo(() => {
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
            case "Itemset":
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
                        {cellValue}
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
                    Frequent itemsets
                </h1>

                {items.length > 0 && (
                    <div className="mx-5 md:mx-8">
                        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                            <CheckoutProduct key={key} items={items} id={items[0]} />
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
                        <TableBody items={items_1}>
                            {(item) => (
                                <TableRow key={item.Confidence}>
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

export default FrequentItemsets;