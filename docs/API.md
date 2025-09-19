# Portfolio API – v1

Base URL: `https://api.yourdomain.com/api/v1`

This API lets you manage projects and journal posts for your portfolio website.

---

## Endpoints

### 1. List Projects
**GET** `/projects`

Returns all published projects.

#### Query Parameters
| Name | Type   | Description                     |
| ---- | ------ | ------------------------------- |
| tag  | string | Filter by tag                   |
| sort | string | Sort field (e.g., `created_at`) |

#### Response
```json
[
  {
    "id": "uuid",
    "title": "My Portfolio Site",
    "slug": "my-portfolio-site",
    "description": "Personal website built with Next.js",
    "tech_stack": ["Next.js", "Tailwind"],
    "created_at": "2025-09-18T12:34:56Z"
  }
]
```



### 2. Get Single Project

**GET** `/projects/{slug}`

Returns details for a project.

#### Path Parameters

| Name | Type   | Description        |
| ---- | ------ | ------------------ |
| slug | string | The project’s slug |

#### Response

```
{
  "id": "uuid",
  "title": "My Portfolio Site",
  "description": "Personal website built with Next.js",
  "tech_stack": ["Next.js", "Tailwind"],
  "repo_url": "https://github.com/me/portfolio",
  "live_url": "https://me.dev"
}
```

------



### 3. Create Project

**POST** `/projects`

> Requires authentication (future).

#### Request Body

```
{
  "title": "New App",
  "description": "A cool side project",
  "tech_stack": ["React", "Node"],
  "repo_url": "https://github.com/me/new-app"
}
```

#### Response

```
{
  "id": "uuid",
  "title": "New App",
  "created_at": "2025-09-18T13:00:00Z"
}
```

------

## Errors

| Code | Message               | When it happens                |
| ---- | --------------------- | ------------------------------ |
| 400  | Bad Request           | Missing or invalid fields      |
| 404  | Not Found             | Project doesn’t exist          |
| 500  | Internal Server Error | Unexpected issue on the server |

------

## Changelog

- **v1.0** – Initial release: projects endpoints.

```
---

## 4️⃣ (Optional) Swagger / OpenAPI

If you want interactive docs:
1. Install `swagger-jsdoc` and `swagger-ui-express`.
2. Write OpenAPI spec in YAML or JS comments.
3. Serve docs at `/docs`.

---

## 5️⃣ Tips

- Keep docs **close to the code** (in the same repo).
- Update them whenever you add or change endpoints.
- Include example curl commands or Postman snippets.
- If you add authentication, document how to get & send tokens.

---

Would you like a ready-to-use **Swagger/OpenAPI** template for your `/projects` routes?
```