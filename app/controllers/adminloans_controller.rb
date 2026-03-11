class AdminloansController < InheritedResources::Base

  private

    def adminloan_params
      params.require(:adminloan).permit(:body, :status, :verified, :user_id, :title, :loan_id)
    end

end
