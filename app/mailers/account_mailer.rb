class AccountMailer < ApplicationMailer
  default :from => "noreply@navysealcredit.com"
  def account_email(user, account)
    @user = user
    @account = account
     mail(to: user.email, subject: 'Account Onboarding')
  end
end
