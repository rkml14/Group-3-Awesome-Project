-- Selects all users and their profile information --
SELECT *
FROM user
INNER JOIN profile
ON user.id = profile.user_id;