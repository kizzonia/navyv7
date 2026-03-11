require "application_system_test_case"

class OtpsTest < ApplicationSystemTestCase
  setup do
    @otp = otps(:one)
  end

  test "visiting the index" do
    visit otps_url
    assert_selector "h1", text: "Otps"
  end

  test "creating a Otp" do
    visit otps_url
    click_on "New Otp"

    fill_in "Otp", with: @otp.otp
    fill_in "Transfer", with: @otp.transfer_id
    click_on "Create Otp"

    assert_text "Otp was successfully created"
    click_on "Back"
  end

  test "updating a Otp" do
    visit otps_url
    click_on "Edit", match: :first

    fill_in "Otp", with: @otp.otp
    fill_in "Transfer", with: @otp.transfer_id
    click_on "Update Otp"

    assert_text "Otp was successfully updated"
    click_on "Back"
  end

  test "destroying a Otp" do
    visit otps_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Otp was successfully destroyed"
  end
end
