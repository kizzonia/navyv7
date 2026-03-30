# Dockerfile
# Use the official Ruby image with slim variant for smaller size
FROM ruby:3.2.2-slim as base
LABEL service="navyv7" 

# Set environment variables
ENV RAILS_ENV=production \
    BUNDLE_WITHOUT=development:test \
    BUNDLE_PATH=/usr/local/bundle \
    NODE_ENV=production

# Install system dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    # Essential build tools
    build-essential \
    # PostgreSQL client libraries
    libpq-dev \
    # For curl and network operations
    curl \
    # For JavaScript runtime (Rails 7 needs this for asset pipeline)
    nodejs \
    # For modern JavaScript features
    npm \
    # For git operations if needed
    git \
    # For security updates
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g yarn

# Set working directory
WORKDIR /app

# Copy Gemfile and Gemfile.lock first for better caching
COPY Gemfile Gemfile.lock ./

# Install Ruby gems
RUN bundle config set --local deployment true && \
    bundle config set --local without 'development test' && \
    bundle install --jobs 4 --retry 3

# Copy application code
COPY . .

# Precompile assets
RUN SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile \
    && bundle exec rails assets:clean

# Clean up unnecessary files to reduce image size
RUN rm -rf node_modules tmp/cache \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /usr/local/bundle/cache

# Create a non-root user for security
RUN useradd -m -u 1000 rails && \
    chown -R rails:rails /app /usr/local/bundle

# Switch to non-root user
USER rails:rails

# Create tmp directory for puma
RUN mkdir -p tmp/pids

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
