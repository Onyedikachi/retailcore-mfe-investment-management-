import React from "react";

const mockNavigate = jest.fn();
const mockLink = ({ to, children }) => <a href={to}>{children}</a>;

module.exports = {
  Link: mockLink,
  useNavigate: mockNavigate,
};
