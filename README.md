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