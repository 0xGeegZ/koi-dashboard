import { useState, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { AiOutlineCaretDown } from "@react-icons/all-files/ai/AiOutlineCaretDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

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

export default function SplitButton({ options, activeIndex }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(activeIndex || 0);

  const handleClick = () => {
    router.push(options[selectedIndex].buttonSrc);
    setSelectedIndex(options[selectedIndex].setIndex);
  };

  const handleMenuItemClick = (event, index, src) => {
    setSelectedIndex(index);
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
        <Button variant="outlined" onClick={handleClick}>
          {options[selectedIndex].title}
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
                  {options.map(({ icon, title, src }, index) => (
                    <MenuItem
                      key={title}
                      onClick={(event) =>
                        handleMenuItemClick(event, index, src)
                      }
                    >
                      {title == "Delete" ? (
                        <Text className="cp-c-row cp-c-align-start-center">
                          <IconContainer>{icon}</IconContainer>
                          <div>{title}</div>
                        </Text>
                      ) : (
                        <TextDelete className="cp-c-row cp-c-align-start-center">
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
