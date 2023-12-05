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
    pageBy: Optional[int] = 10

class Subcategory(BaseModel):
    subcategory: list[str]
app  = FastAPI()

# def plot_chart(rules):
#     x=[''.join(rule["Itemset"]) for rule in rules]
#     y = [rule["Confidence"] for rule in rules] 
#     print(x, y)
#     plt.barh(x, y)
#     plt.ylabel("Rule")
#     plt.xlabel("Confidence") 
#     plt.title("Horizontal bar graph")

#     buf = BytesIO()
#     plt.savefig(buf, format='png', dpi=300)
#     image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8').replace('\n', '')
#     return image_base64

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
products = readProductFile("products.csv")
data1 = readDataFromFile("assoc_rules_all.csv")
data2 = readDataFromFile("data2.csv")
data3 = readDataFromFile("data3.csv")

@app.get("/")
async def root():
    return "Hello World !"

@app.get("/items")
async def api0():
    return {"items": products}
 
@app.post("/frequent-itemsets/item")
async def api1(itemList: ItemList):
    assoc_rules = []
    
    for row in data1:
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
    
    for rule in filtered_assoc_rules:
        rule["Itemset"] = productIdToproductName(rule["Itemset IDs"])
    return filtered_assoc_rules

@app.post("/item/recommendation")
async def api1(itemList: ItemList):
    assoc_rules = []
    
    for row in data1:
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
        assoc_rules.sort(key=extract_conf, reverse=True)
    # Otherwise, do nothing

    assoc_rules = [rule["Recommended"] for rule in assoc_rules]

    if len(assoc_rules) > itemList.pageBy:
        assoc_rules = assoc_rules[:itemList.pageBy]
    return assoc_rules

@app.get("/test_html")
async def api2():
    # assoc_rules = []
    # if subcategory.subcategory == []:
    #     data = data2
    # else:
    #     data = data21
    # for row in data:
    #     frequent_itemset = row[1] + row[2]
    #     assoc_rule = {
    #                 "Itemset": frequent_itemset,
    #                 "Selected": row[1],
    #                 "Recommended": row[2]
    #             }
    #     assoc_rules.append(assoc_rule)

    # return {"itemsets": assoc_rules}
    return HTMLResponse(content="<h1>HELLO WORLD </h1>", status_code=200)
    # return 

@app.post("/frequent-itemsets/subcategory/")
async def api3(subcategoryList: SubcategoryList):
    assoc_rules = []
    
    for row in data3:
        frequent_itemset = row[1] + row[2]
        assoc_rule = {
                    "Subcategory Set": frequent_itemset,
                    "Selected": row[1],
                    "Recommended": row[2],
                    "Confidence": row[3]
                }
        if subcategoryList.subcategoryList == []:
            assoc_rules.append(assoc_rule)
        elif all(x in frequent_itemset for x in subcategoryList.subcategoryList):
            assoc_rules.append(assoc_rule)
    # Descending
    if subcategoryList.sort == 1:
        assoc_rules.sort(key=extract_conf, reverse=True)

    # Otherwise, do nothing
    
    if len(assoc_rules) > subcategoryList.pageBy:
        assoc_rules = assoc_rules[:subcategoryList.pageBy]

    assoc_rules.sort(key=extract_conf, reverse=True)

    return {"itemsets": assoc_rules}