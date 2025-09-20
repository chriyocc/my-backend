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
    "slug": "test-project",
    "title": "Test Project",
    "date": "19 Septembern 2025",
  	"image": "https://res.cloudinary.com/dlaqeohvw/image/upload/v1754748504/img-udo_mqwufl.png",
    "description": "A cool side project",
    "mardown_content": "markdown content",
    "tool_icon1": "<svg >",
    "tool_icon2": "<svg >"
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

```json
{
    "slug": "test-project",
    "title": "Test Project",
    "date": "19 Septembern 2025",
  	"image": "https://res.cloudinary.com/dlaqeohvw/image/upload/v1754748504/img-udo_mqwufl.png",
    "description": "A cool side project",
    "mardown_content": "markdown content",
    "tool_icon1": "<svg >",
    "tool_icon2": "<svg >"
}
```

------



### 3. Create Project

**POST** `/projects`

> Requires authentication (future).

#### Request Body

```json
{
    "slug": "test-project",
    "title": "Test Project",
    "date": "19 Septembern 2025",
  	"image": "https://res.cloudinary.com/dlaqeohvw/image/upload/v1754748504/img-udo_mqwufl.png",
    "description": "A cool side project",
    "mardown_content": "markdown content",
    "tool_icon1": "<svg >",
    "tool_icon2": "<svg >"
}
```

#### Response

```json
{
    "slug": "test-project",
    "title": "Test Project",
    "date": "19 Septembern 2025",
  	"image": "https://res.cloudinary.com/dlaqeohvw/image/upload/v1754748504/img-udo_mqwufl.png",
    "description": "A cool side project",
    "mardown_content": "markdown content",
    "tool_icon1": "<svg >",
    "tool_icon2": "<svg >"
}
```



### 4. Delete Project

#### DELETE `/api/v1/projects/:id`

Deletes a project by its `id`.

**URL Parameters**

| Name | Type | Required | Description                     |
| ---- | ---- | -------- | ------------------------------- |
| `id` | uuid | ✅        | The ID of the project to delete |

**Response**

| Code  | Description                  |
| ----- | ---------------------------- |
| `200` | Project deleted successfully |
| `404` | Project not found            |
| `500` | Server error                 |

**Example Request**

```
DELETE https://api.yoyojun.site/api/v1/projects/123
```

**Example Response**

```
{
  "message": "Project deleted successfully"
}
```

> ⚠️ If you use authentication, mention in the docs which roles are allowed to delete.

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