from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/learn-more")
def read_more():
    return {"msg" : "learn more ig"}

@app.get("/sum")
def sum_numbers(x: int, y: int):
    try:
        result = x + y
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# uvicorn app:app --host 0.0.0.0 --port 8080