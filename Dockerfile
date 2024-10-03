# Set base image for our react app
# So here our image will be configured with environment where nodejs 18 is already installed on the Alpine distribution of linux
FROM node:18-alpine

#Creates a system user named reactuser and assigns this user to the reactgroup group.
RUN addgroup -S reactgroup && adduser -S reactuser -G reactgroup

# Create a directory for our app
WORKDIR /app

# Copy the package.json and package-lock.json files to the /app directory
# The package.json file contains the list of dependencies that need to be installed for the app to run.
# This command will copy the package.json and package-lock.json files from the current directory to the /app directory in the container.
# This is done before copying the rest of the files to take advantage of Docker’s layer caching mechanism.
# If the package.json and package-lock.json files have not changed, Docker will use the cached layer for this step, which will speed up the build process.

COPY package*.json ./

# Change ownership of the app directory to the non-root user
RUN chown -R reactuser:reactgroup /app

# Switch to the non-root user
USER reactuser

# Install the dependencies
RUN npm install

# Copy the rest of the files to the /app directory
COPY . .

# Expose the port 5000
EXPOSE 5000

# Start the app
CMD ["npm", "start"]