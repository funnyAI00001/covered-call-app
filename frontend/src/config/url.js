let backendUrl;

if (process.env.NODE_ENV === "development") {
  console.log("development env");
  backendUrl = "http://localhost:5000";
} else {
  console.log("production env");
  backendUrl = "";
}

export { backendUrl };
