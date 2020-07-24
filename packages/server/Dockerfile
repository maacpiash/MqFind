# MqFind: Query listings of accommodation near Macquarie University campuses
# Copyright (C) 2020  Mohammad Abdul Ahad Chowdhury
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License version 3,
# as published by the Free Software Foundation.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
FROM node:current-slim AS build-stage
WORKDIR /src

# Copy necessary files
COPY package.json package.json
COPY server server
COPY yarn.lock yarn.lock
COPY lerna.json lerna.json

# Install deps and build
RUN yarn install --frozen-lockfile
RUN yarn build:server

# Now, copy the outputs and run
FROM node:current-slim
WORKDIR /app
COPY --from=build-stage /src/server/out out
COPY server/package.json package.json
RUN yarn install --production
EXPOSE 4100
ENTRYPOINT ["yarn", "start"]
