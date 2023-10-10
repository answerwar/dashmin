const ModalCreateUserContainer = document.getElementById(
  "ModalCreateUserContainer"
);
const includeModalCreateUser = async () => {
  const response = await fetch("include/modal_users/create.html");
  const ModalCreateUserHtml = await response.text();
  ModalCreateUserContainer.innerHTML = ModalCreateUserHtml;
};
includeModalCreateUser();

const ModalDeleteUserContainer = document.getElementById(
  "ModalDeleteUserContainer"
);
const includeModalDeleteUser = async () => {
  const response = await fetch("include/modal_users/delete.html");
  const ModalDeleteUserHtml = await response.text();
  ModalDeleteUserContainer.innerHTML = ModalDeleteUserHtml;
};
includeModalDeleteUser();

const ModalEditUserContainer = document.getElementById(
  "ModalEditUserContainer"
);
const includeModalEditUser = async () => {
  const response = await fetch("include/modal_users/edit.html");
  const ModalEditUserHtml = await response.text();
  ModalEditUserContainer.innerHTML = ModalEditUserHtml;
};
includeModalEditUser();

const ModalDisableEnableUserContainer = document.getElementById(
  "ModalDisableEnableUserContainer"
);
const includeModalDisableEnableUser = async () => {
  const response = await fetch("include/modal_users/disable_enable.html");
  const ModalDisableEnableUserHtml = await response.text();
  ModalDisableEnableUserContainer.innerHTML = ModalDisableEnableUserHtml;
};
includeModalDisableEnableUser();


const ModalChangeServiceUserContainer = document.getElementById(
  "ModalChangeServiceUserContainer"
);
const includeModalChangeServiceUser = async () => {
  const response = await fetch("include/modal_users/change_service.html");
  const ModalChangeServiceUserHtml = await response.text();
  ModalChangeServiceUserContainer.innerHTML = ModalChangeServiceUserHtml;
};
includeModalChangeServiceUser();
