require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Code is not reloaded between requests.
  config.enable_reloading = false

  # Eager load code on boot.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local = false
  config.action_controller.perform_caching = true

  # Do not fall back to assets pipeline if a precompiled asset is missed.
  config.assets.compile = false

  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :local

  # Tell Rails it's behind an SSL-terminating reverse proxy (kamal-proxy).
  # This makes Rails trust X-Forwarded-Proto headers and treat requests as HTTPS
  # without expecting Puma itself to handle SSL.
  config.assume_ssl = true

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  # The exclude lambda allows the /up health check endpoint to bypass the SSL redirect
  # so kamal-proxy can health check Puma over plain HTTP internally.
  config.force_ssl = true
  config.ssl_options = {
    redirect: {
      exclude: ->(request) { request.path == "/up" }
    }
  }

  # Log to STDOUT
  config.logger = ActiveSupport::Logger.new(STDOUT)
    .tap  { |logger| logger.formatter = ::Logger::Formatter.new }
    .then { |logger| ActiveSupport::TaggedLogging.new(logger) }

  # Prepend all log lines with the following tags.
  config.log_tags = [ :request_id ]

  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")

  # Disable caching for Action Mailer templates.
  config.action_mailer.perform_caching = false

  # Enable locale fallbacks for I18n.
  config.i18n.fallbacks = true

  # Don't log any deprecations.
  config.active_support.report_deprecations = false

  # Do not dump schema after migrations.
  config.active_record.dump_schema_after_migration = false

  # Only use :id for inspections in production.
  config.active_record.attributes_for_inspect = [ :id ]
#   config.action_mailer.default_url_options = { host: 'https://www.navyscreditunion.com' }
#   config.action_mailer.perform_deliveries = true
#   config.action_mailer.raise_delivery_errors = true
  
#   config.action_mailer.delivery_method = :smtp
# config.action_mailer.smtp_settings = {
#   address:   'smtp.resend.com',
#   port:      465,
#   user_name: 'resend',
#   password:  ENV['RESEND_API_KEY'],
#   tls:       true,
#   # open_timeout: 30,    # ← add this
#   # read_timeout: 30     # ← add this
# }
config.action_mailer.delivery_method = :resend
config.action_mailer.smtp_settings = {
  address:              "smtp.resend.com",
  port:                 587,
  user_name:            "resend",
  password:             ENV["RESEND_API_KEY"],
  authentication:       :plain,
  enable_starttls_auto: true
}
config.action_mailer.default_url_options = { host: "navyscreditunion.com", protocol: "https" }
config.action_mailer.raise_delivery_errors = true
end
