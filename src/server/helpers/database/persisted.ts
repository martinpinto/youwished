export interface Persisted {
// http://apidocs.strongloop.com/loopback/#persistedmodel
    /**
     * Return the number of records that match the optional "where" filter.

     * @method removeChild
     * @param child {DisplayObject} The DisplayObject instance to remove.
     * @returns {DisplayObject} The DisplayObject instance that you pass in the child parameter.
     * @public

        Arguments
        Name	Type	Description
        [where]	Object	
        Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
        See Where filter.
        callback	Function	
        Callback function called with (err, count) arguments. Required.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
        count	Number	
        Number of instances updated.
     */
    count(): number;
    
    /**
     * Create new instance of Model, and save to database.

        Arguments
        Name	Type	Description
        {Object}|[{Object}]		
        data Optional data argument. Can be either a single model instance or an array of instances.
        callback	Function	
        Callback function called with cb(err, obj) signature.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
        models	Object	
        Model instances or null.
     */
    create(): void;
    
    /**
     * Destroy all model instances that match the optional where specification.

        Arguments
        Name	Type	Description
        [where]	Object	
        Optional where filter, like: {key: val, key2: {gt: 'val2'}, ...} 
        See Where filter.
        callback	Function	
        Optional callback function called with (err, info) arguments.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
        info	Object	
        Additional information about the command outcome.
        info.count	Number	
        Number of instances (rows, documents) destroyed.
     */
    destroyAll(): void;
    
    /**
     * Destroy model instance with the specified ID.

        Arguments
        Name	Type	Description
        id		
        The ID value of model instance to delete.
        callback	Function	
        Callback function called with (err) arguments. Required.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
     */
    destroyById(): void;
    
    /**
     * Check whether a model instance exists in database.

        Arguments
        Name	Type	Description
        id	id	
        Identifier of object (primary key value).
        callback	Function	
        Callback function called with (err, exists) arguments. Required.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
        exists	Boolean	
        True if the instance with the specified ID exists; false otherwise.
     */
    exists(): void;
    
    /**
     * Find all model instances that match filter specification. See Querying models.

        Arguments
        Name	Type	Description
        [filter]	Object	
        Optional Filter JSON object; see below.
        callback	Function	
        Callback function called with (err, returned-instances) arguments. Required.
        [Filter]
        Name	Type	Description
        fields	String or Object or Array	
        Identify fields to include in return result. 
        See Fields filter.
        include	String or Object or Array	
        See PersistedModel.include documentation. 
        See Include filter.
        limit	Number	
        Maximum number of instances to return. 
        See Limit filter.
        order	String	
        Sort order: either "ASC" for ascending or "DESC" for descending. 
        See Order filter.
        skip	Number	
        Number of results to skip. 
        See Skip filter.
        where	Object	
        Where clause, like { where: { key: val, key2: {gt: 'val2'}, ...} }
        See Where filter.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
        models	Array	
        Model instances matching the filter, or null if none found.
     */
    find(): void;
    
    /**
     * Find object by ID with an optional filter for include/fields.

        Arguments
        Name	Type	Description
        id		
        Primary key value
        [filter]	Object	
        Optional Filter JSON object; see below.
        callback	Function	
        Callback function called with (err, instance) arguments. Required.
        [Filter]
        Name	Type	Description
        fields	String or Object or Array	
        Identify fields to include in return result. 
        See Fields filter.
        include	String or Object or Array	
        See PersistedModel.include documentation. 
        See Include filter.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
        instance	Object	
        Model instance matching the specified ID or null if no instance matches.
     */
    findById(): void;
    
    /**
     * Find one model instance that matches filter specification. Same as find, but limited to one result; Returns object, not collection.

        Arguments
        Name	Type	Description
        [filter]	Object	
        Optional Filter JSON object; see below.
        callback	Function	
        Callback function called with (err, returned-instance) arguments. Required.
        [Filter]
        Name	Type	Description
        fields	String or Object or Array	
        Identify fields to include in return result. 
        See Fields filter.
        include	String or Object or Array	
        See PersistedModel.include documentation. 
        See Include filter.
        order	String	
        Sort order: either "ASC" for ascending or "DESC" for descending. 
        See Order filter.
        skip	Number	
        Number of results to skip. 
        See Skip filter.
        where	Object	
        Where clause, like {where: { key: val, key2: {gt: 'val2'}, ...} }
        See Where filter.
     */
    findOne(): void;
    
    /**
     * Update multiple instances that match the where clause.

        * Arguments
        Name	Type	Description
        [where]	Object	
        Optional where filter, like { key: val, key2: {gt: 'val2'}, ...} 
        see Where filter.
        data	Object	
        Object containing data to replace matching instances, if any.
        callback	Function	
        Callback function called with (err, info) arguments. Required.
        Callback
        Name	Type	Description
        err	Error	
        Error object; see Error object.
        info	Object	
        Additional information about the command outcome.
        info.count	Number	
        Number of instances (rows, documents) updated.
     */
    updateAll(): void;

} 
