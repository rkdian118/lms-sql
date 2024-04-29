import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, ButtonBase, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { useDispatch, useSelector } from 'store';
import { activeID, activeItem, openDrawer, openPopupModel } from 'store/slices/menu';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ListIcon from '../../../../assets/Icons/sideicon.png';
import MuiTooltip from '@mui/material/Tooltip';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level, parentId }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { layout, borderRadius } = useConfig();

    const { selectedItem, drawerOpen } = useSelector((state) => state.menu);
    const isSelected = selectedItem.findIndex((id) => id === item.id) > -1;
    const { adminRole } = useSelector((state) => state.admin);

    const Icon = item?.icon;
    const itemIcon = item?.icon ? (
        <Icon
            stroke={1.5}
            size={drawerOpen ? '20px' : '24px'}
            style={{ color: isSelected ? theme.palette.secondary.main : theme.palette.text.primary }}
        />
    ) : (
        <FiberManualRecordIcon
            sx={{
                color: isSelected ? theme.palette.secondary.main : theme.palette.text.primary,
                width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch(activeItem([id]));
        if (matchesSM) dispatch(openDrawer(false));
        dispatch(activeID(parentId));
        dispatch(openPopupModel({ openItemKey: id, modalState: true }));
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(activeItem([item.id]));
        }
        // eslint-disable-next-line
    }, [pathname]);

    const textColor = theme.palette.mode === 'dark' ? 'grey.400' : 'text.primary';
    const iconSelectedColor = theme.palette.mode === 'dark' && drawerOpen ? 'text.primary' : 'secondary.main';
    // console.log('🚀drawerOpen:', item);

    return (
        <>
            {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
                <ListItemButton
                    {...listItemProps}
                    disabled={item.disabled}
                    disableRipple={!drawerOpen}
                    sx={{
                        zIndex: 1201,
                        borderRadius: `${borderRadius}px`,
                        // mb: 0.5,
                        background:
                            (drawerOpen && adminRole === 'Admin') ||
                            (drawerOpen && adminRole === 'Cluster') ||
                            (drawerOpen && adminRole === 'Manager') ||
                            (drawerOpen && adminRole === 'ClusterLead')
                                ? '#c6d9ff'
                                : 'transparent',
                        backgroundImage: drawerOpen && adminRole === 'Business' ? `url('${ListIcon}')` : 'transparent',
                        backgroundSize: '100% 100%',
                        my:
                            adminRole === 'Admin' || adminRole === 'Cluster' || adminRole === 'Manager' || adminRole === 'ClusterLead'
                                ? '10px'
                                : 0.5,
                        pl: drawerOpen ? `${level * 24}px` : 1.25,
                        ...(drawerOpen &&
                            level === 1 &&
                            theme.palette.mode !== 'dark' && {
                                '&:hover': {
                                    background:
                                        adminRole === 'Admin' ||
                                        adminRole === 'Cluster' ||
                                        adminRole === 'Manager' ||
                                        adminRole === 'ClusterLead'
                                            ? '#c6d9ff'
                                            : 'transparent',
                                    backgroundImage: adminRole === 'Business' ? `url('${ListIcon}')` : 'transparent',
                                    px: 1
                                },
                                '&.Mui-selected': {
                                    // background: theme.palette.secondary.light,
                                    backgroundImage: adminRole === 'Business' ? `url('${ListIcon}')` : 'transparent',
                                    color: iconSelectedColor,
                                    '&:hover': {
                                        color: iconSelectedColor,
                                        // background: theme.palette.secondary.light
                                        backgroundImage: adminRole === 'Business' ? `url('${ListIcon}')` : 'transparent'
                                    }
                                }
                            }),
                        ...((!drawerOpen || level !== 1) && {
                            py: level === 1 ? 0 : 1,
                            '&:hover': {
                                bgcolor: '#c6d9ff' // before 'transparent'
                            },
                            '&.Mui-selected': {
                                py: level === 1 ? 0 : 1,
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    backgroundImage: adminRole === 'Business' ? `url('${ListIcon}')` : 'transparent'
                                },
                                bgcolor: 'transparent',
                                backgroundImage: adminRole === 'Business' ? `url('${ListIcon}')` : 'transparent'
                            }
                        })
                    }}
                    // selected={isSelected}
                    onClick={() => itemHandler(item.id)}
                >
                    {drawerOpen ? (
                        <ButtonBase sx={{ borderRadius: `${borderRadius}px` }} disableRipple={drawerOpen} aria-label="pages icon">
                            <ListItemIcon
                                sx={{
                                    minWidth: level === 1 ? 36 : 18,
                                    color: isSelected ? iconSelectedColor : textColor,
                                    ...(!drawerOpen &&
                                        level === 1 && {
                                            borderRadius: `${borderRadius}px`,
                                            width: 46,
                                            height: 46,
                                            alignItems: 'center',
                                            // justifyContent: 'center',
                                            // mr: adminRole === 'Business' ? 1 : 0,
                                            justifyContent: adminRole === 'Business' ? 'flex-end' : 'center',
                                            '&:hover': {
                                                bgcolor: '#c6d9ff'
                                                // py: level === 1 ? 0 : 1
                                            },
                                            ...(isSelected && {
                                                // icon--bg
                                                // bgcolor: '#c6d9ff',
                                                '&:hover': {
                                                    bgcolor: '#c6d9ff'
                                                }
                                            })
                                        })
                                }}
                            >
                                {itemIcon}
                            </ListItemIcon>
                        </ButtonBase>
                    ) : (
                        <MuiTooltip title={item?.title?.props?.id} arrow placement="right">
                            <ButtonBase sx={{ borderRadius: `${borderRadius}px` }} disableRipple={drawerOpen} aria-label="pages icon">
                                <ListItemIcon
                                    sx={{
                                        minWidth: level === 1 ? 36 : 18,
                                        color: isSelected ? iconSelectedColor : textColor,
                                        ...(!drawerOpen &&
                                            level === 1 && {
                                                borderRadius: `${borderRadius}px`,
                                                width: 46,
                                                height: 46,
                                                alignItems: 'center',
                                                // justifyContent: 'center',
                                                // mr: adminRole === 'Business' ? 1 : 0,
                                                justifyContent: adminRole === 'Business' ? 'flex-end' : 'center',
                                                '&:hover': {
                                                    bgcolor: '#c6d9ff'
                                                    // py: level === 1 ? 0 : 1
                                                },
                                                ...(isSelected && {
                                                    // icon--bg
                                                    // bgcolor: '#c6d9ff',
                                                    '&:hover': {
                                                        bgcolor: '#c6d9ff'
                                                    }
                                                })
                                            })
                                    }}
                                >
                                    {itemIcon}
                                </ListItemIcon>
                            </ButtonBase>
                        </MuiTooltip>
                    )}

                    {(drawerOpen || (!drawerOpen && level !== 1)) && (
                        <ListItemText
                            primary={
                                <Typography
                                    align={
                                        adminRole === 'Admin' ||
                                        adminRole === 'Cluster' ||
                                        adminRole === 'Manager' ||
                                        adminRole === 'ClusterLead'
                                            ? 'left'
                                            : 'left'
                                    }
                                    variant={isSelected ? 'h5' : 'h5'}
                                    sx={{ color: '#4c659a' }}
                                >
                                    {item.title}
                                </Typography>
                            }
                            secondary={
                                item.caption && (
                                    <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                        {item.caption}
                                    </Typography>
                                )
                            }
                        />
                    )}

                    {drawerOpen && item.chip && (
                        <Chip
                            color={item.chip.color}
                            variant={item.chip.variant}
                            size={item.chip.size}
                            label={item.chip.label}
                            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                        />
                    )}
                </ListItemButton>
            ) : (
                <ListItemButton
                    {...listItemProps}
                    disabled={item.disabled}
                    sx={{
                        borderRadius: 0,
                        mb: 0.5,
                        alignItems: 'flex-start',
                        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                        py: 1,
                        pl: 2
                    }}
                    selected={isSelected}
                    onClick={() => itemHandler(item.id)}
                >
                    <ListItemIcon
                        sx={{
                            my: 'auto',
                            minWidth: !item?.icon ? 18 : 36
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon>

                    <ListItemText
                        primary={
                            <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit">
                                {item.title}
                            </Typography>
                        }
                        secondary={
                            item.caption && (
                                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )
                        }
                    />

                    {item.chip && (
                        <Chip
                            color={item.chip.color}
                            variant={item.chip.variant}
                            size={item.chip.size}
                            label={item.chip.label}
                            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                        />
                    )}
                </ListItemButton>
            )}
        </>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number,
    parentId: PropTypes.string
};

export default NavItem;
// {drawerOpen && adminRole === 'Admin' ? (
//     ''
// ) : (
//     <>
//         {(drawerOpen && adminRole === 'Cluster') ||
//         (drawerOpen && adminRole === 'Manager') ||
//         (drawerOpen && adminRole === 'ClusterLead') ? (
//             ''
//         ) : (
//             <MuiTooltip title={item?.title?.props?.id} arrow placement="right">
//                 <ButtonBase
//                     sx={{ borderRadius: `${borderRadius}px` }}
//                     disableRipple={drawerOpen}
//                     aria-label="pages icon"
//                 >
//                     <ListItemIcon
//                         sx={{
//                             minWidth: level === 1 ? 36 : 18,
//                             color: isSelected ? iconSelectedColor : textColor,
//                             ...(!drawerOpen &&
//                                 level === 1 && {
//                                     borderRadius: `${borderRadius}px`,
//                                     width: 46,
//                                     height: 46,
//                                     alignItems: 'center',
//                                     // justifyContent: 'center',
//                                     // mr: adminRole === 'Business' ? 1 : 0,
//                                     justifyContent: adminRole === 'Business' ? 'flex-end' : 'center',
//                                     '&:hover': {
//                                         bgcolor: '#c6d9ff'
//                                         // py: level === 1 ? 0 : 1
//                                     },
//                                     ...(isSelected && {
//                                         // icon--bg
//                                         // bgcolor: '#c6d9ff',
//                                         '&:hover': {
//                                             bgcolor: '#c6d9ff'
//                                         }
//                                     })
//                                 })
//                         }}
//                     >
//                         {itemIcon}
//                     </ListItemIcon>
//                 </ButtonBase>
//             </MuiTooltip>
//         )}
//     </>
// )}
