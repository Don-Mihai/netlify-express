import React from 'react';
import './Options.scss';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
    onClickEdit?: (event: any) => any;
    onClickDelete?: (event: any) => any;
    onAddBookmark?: (event: any) => any;
    options: string[];
    id: number;
	className?: string;
}

const ITEM_HEIGHT = 48;

function Options({ onClickEdit, onClickDelete, onAddBookmark, options, id, className }: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClickTab = (index: number) => {
        if (index === 0) {
            onClickEdit && onClickEdit(id);
        }
        if (index === 1) {
            onClickDelete && onClickDelete(id);
        }
        if (index === 2) {
            onAddBookmark && onAddBookmark(id);
        }
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={className ? className : ''} >
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                color={'info'}
                sx={{ color: 'white' }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option, index) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => handleClickTab(index)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default React.memo(Options);
