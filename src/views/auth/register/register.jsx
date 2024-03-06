/* eslint-disable */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
  Select,
} from "@chakra-ui/react";
// import usetoas
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { createEmployee } from "services/employee";
import { createCompany } from "services/company";

//Services
import ReactGa from "react-ga";
import { GOOGLE_ANALYTICS_ID } from "config/config";

ReactGa.initialize(GOOGLE_ANALYTICS_ID);
function Register() {
  const [user, setUser] = useState(false);
  const [vendor, setVendor] = useState(false);
  const [loggedResponse, setResponse] = useState();
  const [checkpassword, setCheckPassword] = useState("");
  const [password, setPassword] = useState();
  const toast = useToast();
  const [selectedRole, setSelectedRole] = useState("HR");
  const [formState, setFormState] = useState({
    name: "",
    registered_company_number: "",
    vat_number: "",
    email: "",
    address_line1: "Lagos, Nigeria",
    address_line2: "",
    city: "",
    country: "",
    phone: "",
    company_logo: "",
    employee: true,
    department: true,
    user: true,
    activity: true,
    reports: false,
    notification: false,
    expenseManagement: false,
    inventoryManagement: false,
    currency: "USD", // NGN
    timezone: "",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    language: "en",
    theme: "light",
    password: "",
    confirmPassword: "",
  });

  const checkPassword = (myPassword) => {
    setPassword(myPassword);
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})"
    );
    if (strongRegex.test(password)) {
      setCheckPassword("password is strong");
      // document.getElementById("password").style.borderColor = "green";
    } else {
      setCheckPassword(
        "password is weak, try adding special characters, numbers and capital letters"
      );
      // document.getElementById("password").style.borderColor = "red";
    }
  };

  const updateForm = (e) => {
    const { value, name } = e.target;
    if (name === "password") {
      checkPassword(value);
    }

    if (name === "roleType") {
      setSelectedRole(value === "Hr" ? "HR" : value);
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "20px", md: "6vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
        </Box>
        <Flex
          // zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "50px", md: "auto" }}
        >
          <FormControl onSubmit={createCompaniesAction}>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Company<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Enter Company Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => updateForm(e)} // Pass the name property
              value={formState?.name}
              name="name"
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="Enter Email"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => updateForm(e)}
              value={formState?.email}
              name="email"
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Address<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Enter Company Address"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => updateForm(e)}
              value={formState?.address}
              name="address"
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Select Role<Text color={brandStars}>*</Text>
            </FormLabel>
            <Select
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Select Role"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => updateForm(e)}
              value={formState?.roleType}
              name="roleType"
            >
              <option value="option1">Hr</option>
              <option value="option1">Vendor</option>
            </Select>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Phone<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="Enter Phone Number"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => updateForm(e)}
              value={formState?.phone}
              name="phone"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                onChange={(e) => updateForm(e)}
                value={formState?.password}
                name="password"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {formState?.password !== "" && (
              <PasswordStrengthBar password={password} />
            )}
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            {formState?.confirmPassword !== "" &&
              formState?.password !== formState?.confirmPassword && (
                <text style={{ color: "red", font: "small-caption" }}>
                  Password does not match
                </text>
              )}
            {formState?.confirmPassword !== "" &&
              formState?.password === formState?.confirmPassword && (
                <text style={{ color: "green", font: "small-caption" }}>
                  Password match
                </text>
              )}
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                onChange={(e) => updateForm(e)}
                value={formState?.confirmPassword}
                name="confirmPassword"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              // onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </FormControl>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have account?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign In
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default Register;
