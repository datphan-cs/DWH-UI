from fastapi import FastAPI
import json
import csv
# import matplotlib.pyplot as plt
# from io import BytesIO
# import base64
from typing import Optional
from pydantic import BaseModel
from fastapi.responses import HTMLResponse


class ItemList(BaseModel):
    itemList: list[str]
    sort: Optional[int] = 1
    pageBy: Optional[int] = 10

class SubcategoryList(BaseModel):
    subcategoryList: list[str]
    sort: Optional[int] = 1
    pageBy: Optional[int] = 30

class Subcategory(BaseModel):
    subcategory: list[str]
app  = FastAPI()


def extract_conf(json_data):
    return json_data["Confidence"]
def readDataFromFile(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)
        data = []
        for line in csv_reader:
            data.append(line)
        for i in range(len(data)):
            row = data[i]
            data[i] = eval(row[0]), list(eval(row[1])), list(eval(row[2])), eval(row[3])
            
    return data
def readProductFile(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)
        data = []
        for line in csv_reader:
            data.append(line)
        for i in range(len(data)):
            row = data[i]
            data[i] = {"productId": eval(row[1]), 
                       "productName": row[2], 
                        "price": eval(row[4])
                        }
    
    return data

def readSubcategoryFile(filename):
    with open(filename) as csv_file:
        csv_reader = csv.reader(csv_file)
        next(csv_reader)
        data = []
        for line in csv_reader:
            data.append(line)
        for i in range(len(data)):
            row = data[i]
            data[i] = {"subcategoryId": eval(row[1]), 
                       "subcategoryName": row[2]
                        }
    
    return data

def productIdToproductName(productIds):
    productNames = []
    productIds_copy = productIds.copy()
    for product in products:
        if product["productId"] in productIds_copy:
            productNames.append(product["productName"])
            productIds_copy.remove(product["productId"])
        if len(productIds_copy) == 0:
            break
    return productNames

def subcategoryIdTosubcategoryName(subcategoryIds):
    subcategoryNames = []
    subcategoryIds_copy = subcategoryIds.copy()
    for subcategory in subcategories:
        if subcategory["subcategoryId"] in subcategoryIds_copy:
            subcategoryNames.append(subcategory["subcategoryName"])
            subcategoryIds_copy.remove(subcategory["subcategoryId"])
        if len(subcategoryIds_copy) == 0:
            break
    return subcategoryNames

products = readProductFile("products.csv")
subcategories = readSubcategoryFile("categories.csv")
assoc_rules_all = readDataFromFile("assoc_rules_all.csv")
assoc_rules_subcategory = readDataFromFile("assoc_rules_subcategory.csv")

@app.get("/")
async def root():
    return "Hello World !"

@app.get("/items")
async def get_all_items():
    return {"items": products}

@app.get("/subcategories")
async def get_all_subcategories():
    return {"subcategories": subcategories}

@app.post("/frequent-itemsets/item")
async def api1(itemList: ItemList):
    assoc_rules = []
    
    for row in assoc_rules_all:
        frequent_itemset = row[1] + row[2]
        assoc_rule = {
                    "Itemset IDs": frequent_itemset,
                    "Confidence": row[3]
                }
        if itemList.itemList == []:
            assoc_rules.append(assoc_rule)
        elif all(x in frequent_itemset for x in itemList.itemList):
            assoc_rules.append(assoc_rule)

    # Descending
    if itemList.sort == 1:
        assoc_rules.sort(key=extract_conf, reverse=True)
    # Otherwise, do nothing
    
    if len(assoc_rules) > itemList.pageBy:
        filtered_assoc_rules = assoc_rules[:itemList.pageBy]
    else:
        filtered_assoc_rules = assoc_rules
    
    for rule in filtered_assoc_rules:
        rule["Itemset"] = productIdToproductName(rule["Itemset IDs"])

    return filtered_assoc_rules

@app.post("/items/recommendation")
async def api1(itemList: ItemList):
    assoc_rules = []
    
    for row in assoc_rules_all:
        # frequent_itemset = row[1] + row[2]
        assoc_rule = {
                    "Recommended": row[2],
                    "Confidence": row[3]
                }
        # Check if item in cart exists in antecedents
        if len(set(row[1] + itemList.itemList)) !=  len(row[1]) + len(itemList.itemList):
            assoc_rules.append(assoc_rule)
    
    # Descending
    if itemList.sort == 1:
        assoc_rules.sort(key = extract_conf, reverse = True)
    # Otherwise, do nothing

    filtered_assoc_rules = [rule["Recommended"] for rule in assoc_rules]

    if len(assoc_rules) > itemList.pageBy:
        filtered_assoc_rules = filtered_assoc_rules[:itemList.pageBy]
    
    for rule in filtered_assoc_rules:
        rule["Itemset"] = productIdToproductName(rule["Itemset IDs"])

    return {"items": filtered_assoc_rules}

@app.get("/test_html")
async def api2():
    return HTMLResponse(content="<h1>HELLO WORLD </h1>", status_code=200)

@app.post("/frequent-itemsets/subcategory/")
async def api3(subcategoryList: SubcategoryList):
    assoc_rules = []
    
    for row in assoc_rules_subcategory:
        frequent_itemset = row[1] + row[2]
        assoc_rule = {
                    "Subcategory Set IDs": frequent_itemset,
                    "Confidence": row[3]
                }
        if subcategoryList.subcategoryList == []:
            assoc_rules.append(assoc_rule)
        elif all(x in frequent_itemset for x in subcategoryList.subcategoryList):
            assoc_rules.append(assoc_rule)
        
    # Descending
    if subcategoryList.sort == 1:
        assoc_rules.sort(key=extract_conf, reverse=True)

    if len(assoc_rules) > subcategoryList.pageBy:
        filtered_assoc_rules = assoc_rules[:subcategoryList.pageBy]
    else:
        filtered_assoc_rules = assoc_rules.copy()

    for rule in filtered_assoc_rules:
        rule["Subcategory Set Names"] = subcategoryIdTosubcategoryName(rule["Subcategory Set IDs"])

    return {"Subcategory Sets": filtered_assoc_rules}