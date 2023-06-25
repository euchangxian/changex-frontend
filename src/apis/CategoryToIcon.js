import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BathtubIcon from '@mui/icons-material/Bathtub';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function CategoryToIcon(category) {
  const categoryToIcon = {
    "Meals": <FastfoodIcon />,
    "Groceries": <LocalGroceryStoreIcon />,
    "Transport": <DirectionsBusIcon />,
    "Course Materials": <SchoolIcon />,
    "Entertainment": <SportsEsportsIcon />,
    "Personal Care": <BathtubIcon />,
    "Clothes": <ShoppingBagIcon />,
    "Gifts / Charity": <CardGiftcardIcon />,
    "Others": <MoreHorizIcon />,
  };

  return categoryToIcon[category] || <MoreHorizIcon />; // returns MoreHorizIcon if the category doesn't match any key in the mapping
}
