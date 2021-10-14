import { useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { AiOutlineCaretDown } from "@react-icons/all-files/ai/AiOutlineCaretDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const IconContainer = styled.div`
  margin-right: 0.6rem;
  margin-top: 0.2rem;
  font-size: 1rem;
`;
const Text = styled.div`
  color: ${(props) => props.theme.mainColor};
`;
const TextDelete = styled.div`
  color: ${(props) => props.theme.redColor};
`;

export default function SplitButton({ options }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleMenuItemClick = (event, src) => {
    setOpen(false);
    router.push(src);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="outlined" ref={anchorRef}>
        <Button
          variant="outlined"
          onClick={(event) => handleMenuItemClick(event, options[0].src)}
        >
          {options[0].title}
        </Button>
        <Button
          variant="outlined"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <AiOutlineCaretDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map(({ icon, title, src, handleClick }) => (
                    <MenuItem
                      key={title}
                      onClick={(event) =>
                        title != "Delete" && handleMenuItemClick(event, src)
                      }
                    >
                      {title != "Delete" ? (
                        <Text className="cp-c-row cp-c-align-start-center">
                          <IconContainer>{icon}</IconContainer>
                          <div>{title}</div>
                        </Text>
                      ) : (
                        <TextDelete
                          onClick={() => {
                            toast
                              .promise(handleClick(), {
                                loading: `Deleting koi ...`,
                                success: `koi deleted!`,
                                error: (err) => err,
                              })
                              .then(() => {
                                router.push(src);
                              });
                          }}
                          className="cp-c-row cp-c-align-start-center"
                        >
                          <IconContainer>{icon}</IconContainer>
                          <div>{title}</div>
                        </TextDelete>
                      )}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
