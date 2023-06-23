const origins = ["http://localhost:3000"];

const corsOptions = {
  origin: function(origin: any, callback: any) {
    if (origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export {corsOptions};
