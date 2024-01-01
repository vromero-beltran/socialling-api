const router = require('express').Router();

const {
   getAllUsers,
   getUserById,
   createUser,
   updateUser,
   deleteUser,
   addFriend,
   removeFriend,
   addThought,
} = require('../../controllers/userController.js');

router.route('/')
   .get(getAllUsers)
   .post(createUser);

router.route('/:userId')
   .get(getUserById)
   .put(updateUser)
   .delete(deleteUser);

router.route('/:userId/friends/:friendId')
   .put(addFriend)
   .delete(removeFriend);

router.route('/:userId/thoughts')
   .post(addThought);

module.exports = router;