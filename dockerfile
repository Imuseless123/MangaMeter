# Use the Node.js 18 base image (or the version you're using)
FROM node:18

# Create and set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code into the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app in development mode
CMD ["npm", "run", "dev"]
