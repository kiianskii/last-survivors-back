const getFilterWithOwnerId = (req) => {
    const { id: _id } = req.params;
    const { _id: owner_id } = req.user;
    const filter = {
        owner_id,
        _id,
    };

    return filter;
};

// Here add getFilterWithBoardID, getFilterWithColumnID

export default { OwnerId: getFilterWithOwnerId };
