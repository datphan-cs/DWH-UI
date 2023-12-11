## Getting Started

# Frontend Installation
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, start at the root of the project, cd into the "front-end" folder then run the commmand:

```{Bash}
npm install
npm run dev
```

If there is a depency problem, run the alternative script:
```{Bash}
npm install --force
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Backend Installation
This is a [Python](https://www.python.org/) project running with [FastAPI](https://fastapi.tiangolo.com/) for fetching data.

First, start at the root of the project, cd into the "back-end" folder then run the commmand:

```{Bash}
pip install -r requirements.txt
uvicorn main:app --host localhost --port 8000 --reload
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

# Workflow
First, we start at the homepage:
![Screenshot 2023-12-11 222116](https://github.com/datphan-cs/DWH-UI/assets/78369139/144ca26c-b38b-4ff8-bb7c-0e5ab679e1dd)

As an admin, as you select items on the page "Products", you can click on the bar chart icon on the top right corner to view frequent itemset that is related to those selected items, or without any selection, it will display all frequent itemset that was mined.
![image](https://github.com/datphan-cs/DWH-UI/assets/78369139/87980cf8-a67b-4a5d-8bfd-c7077bd0dfab)

Another feature is recommending frequent subcategory sets that goes together. The workflow is similar to the previous feature, the admin navigate to page "Category", select one or more category then click on the pie chart icon. The website will display the frequent subcategory sets that are related to the selected categories.
![image](https://github.com/datphan-cs/DWH-UI/assets/78369139/e0209ec6-22dd-407d-bc44-aac33f01a772)


An addition feature is recommending items for an end-user. As they add product to their basket, they can then head to the checkout page, where they will get suggestions of related items that they may want to add to the basket before checkout.
![image](https://github.com/datphan-cs/DWH-UI/assets/78369139/96f9f80d-c502-49e6-b3f4-2971666f1163)




