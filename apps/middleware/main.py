from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from routers import users, groups, events
from fastapi.encoders import jsonable_encoder
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Divvy App v0.0.1")

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """
    Intercepts standard HTTP exceptions and wraps them in a common schema.
    """

    encoded_data = jsonable_encoder(
        schemas.error_response(detail=exc.detail, code=exc.status_code)
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content=encoded_data
    )

@app.get("/")
def root():
    return {"message": "Welcom to Divvy App v0.0.1"}

@app.get("/health", tags=["Health"])
def health_check(db: Session = Depends(get_db)):
    
    try:
        db.execute(text("SELECT 1"))
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(
            status_code=503, 
            detail="Database connection failed"
        )
    
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(groups.router, prefix="/groups", tags=["Groups"])
app.include_router(events.router, prefix="/events", tags=["Events"])
