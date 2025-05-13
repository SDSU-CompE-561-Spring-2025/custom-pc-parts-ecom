# PC Builder

PC Builder started as a 2025 class project with one goal: make building custom PCs easy for everyone. Whether you're a beginner or a seasoned builder, our platform helps you:

- Explore and select compatible components

- Build custom PC builds and save them

- Check your total budget needed

We’re passionate Computer Science and Computer Engineering students using this project to grow our skills in web development, databases, and UI/UX design. 

Thanks for checking out PC Builder!


## Authors

- [@martinazab](https://www.github.com/martinazab)
- [@hhsw0322](https://www.github.com/hhsw0322)
- [@Yousif287](https://www.github.com/Yousif287)
- [@abed-andrea](https://www.github.com/abed-andrea)
- [@DianaYousefnejad](https://www.github.com/DianaYousefnejad)


## Project Setup & Running Instructions

To set up and run the **Custom PC Parts E-Commerce Website** locally, refer to the following guide:

---

### Prerequisites

Ensure the following tools are installed on your system:

* [Docker Desktop](https://docs.docker.com/get-docker/)
* [Python 3.11+](https://www.python.org/downloads/)
* [uv](https://github.com/astral-sh/uv)
* [Node.js 18+ and npm](https://nodejs.org/)

---

### Step-by-Step Installation

#### 1. Start Docker Containers

Run the following command to start the database:

```bash
docker compose up -d
```

---

#### 2. Backend Setup (FastAPI)

```bash
cd backend
cd backend-implementation
```

* Create and activate a virtual environment using `uv`:

  ```bash
  uv venv --python 3.11
  ```

  > **Note:** After running this command, copy and run the green activation command shown in your terminal to activate the virtual environment.

* Install dependencies:

  ```bash
  uv sync
  ```

* Seed the database with initial data:

  ```bash
  uv run seed.py
  ```

* Run the FastAPI server:

  ```bash
  uv run uvicorn app.main:app --reload
  ```

  The backend will be available at: `http://localhost:8000/docs`

---

#### 3. Frontend Setup

* Navigate to the frontend folder:

  ```bash
  cd frontend-implementation
  ```

* Install frontend dependencies:

  ```bash
  npm install
  ```

* Start the frontend development server:

  ```bash
  npm run dev
  ```

  The frontend will usually be available at: `http://localhost:3000`

---

### Troubleshooting

* **Port Already in Use?**

  * Make sure no other apps are using ports `8000` (backend) or `3000` (frontend).
  * You can stop conflicting processes or change the ports in config files.

* **uv Not Found?**

  * Install `uv` using pip:

    ```bash
    pip install uv
    ```

* **Docker Compose Not Starting?**

  * Check Docker is running.
  * Run `docker compose down` to clean up previous containers and try again.

* **Database Connection Errors?**

  * Ensure Docker containers are fully up before running the backend.
  * You may check container status using:

    ```bash
    docker ps
    ```

---

### Testing the Setup

Once both servers are running:

* Visit `http://localhost:3000` → You should see the frontend UI.
* Visit `http://localhost:8000/docs` → You should see the FastAPI Swagger API docs.

## 🛠 Tech Stack

**Frontend:**  
- React  
- Next.js  
- ShadCN UI (built on Radix and Tailwind CSS)  
- Tailwind CSS  

**Backend:**  
- Python  
- FastAPI  
- Docker (for containerization and deployment)

**Database & Validation:**  
- PostgreSQL  
- Pydantic (for data validation and serialization with FastAPI)


## Design Prototype

View the [Figma design](https://www.figma.com/design/lKPIPyJtR3CUvrTDMpBIA6/PCBuilder-Website?node-id=1-3&t=15ZUjtIhlrhlKhEo-1) for a look at our UI/UX planning.

## Framework

[Frontend](https://docs.google.com/document/d/1g-9Kg0ZUJ36DUJfZoyMr2_HaaYFM4muvUC4tuU-QKVY/edit?usp=sharing)

[Backend](https://docs.google.com/document/d/1-dHHz9crwMJ2rVb9IbufTRgidSWjN1aymbC9w5ae7HQ/edit?usp=sharing)
