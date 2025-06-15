# שלב build
FROM node:18 as build

WORKDIR /app

# העתקת קבצי התלויות והתקנה עם עקיפת קונפליקטים
COPY package*.json ./
RUN npm install --legacy-peer-deps

# העתקת שאר הקוד והרצת build
COPY . .
RUN npm run build

# שלב הפעלה עם nginx
FROM nginx:alpine

# העתקת התוצר מ-react build לתיקיית nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
