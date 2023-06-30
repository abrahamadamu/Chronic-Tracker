let useLocal = false;

const local = "http://localhost:5001/chronic-tracker/us-central1/backend";
const prod = "https://us-central1-chronic-tracker.cloudfunctions.net/backend";

let backend: string;

if (useLocal == undefined) {
  backend = document.location.host.includes("localhost") ? local : prod;
} else {
  backend = useLocal ? local : prod;
}

export { backend };
