class OtpsController < InheritedResources::Base
  layout "account"
    before_action :authenticate_user!
    def create
      @transfer = Transfer.friendly.find(params[:transfer_id])
      @otp = @transfer.otps.create(params[:otp].permit(:otp))
         redirect_to root_path, notice: "transfer successfully confirmed and in progress"

    end

  private
    def otp_params
      params.require(:otp).permit(:otp, :transfer_id)
    end

end
