FROM python:3.12-slim

WORKDIR /app

COPY seed_data /app/seed_data
COPY . /app

RUN pip install hatch uv

ENV PATH="/app/.venv/bin:$PATH"

RUN uv venv

RUN hatch run uv sync

EXPOSE 8000

# ENTRYPOINT ["hatch", "run"]
# CMD ["start"]

# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

CMD ["sh", "-c", "python /app/seed.py && uvicorn app.main:app --host 0.0.0.0 --port 8000"]