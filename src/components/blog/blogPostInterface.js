import React from 'react';

export const BlogPostInterface = (props) => {
    return (
        <div className="container" id="post-interface-container">
            <form>
                <label id="label-img" htmlFor="input-img"><b>Select Image:</b></label>
                <input type="file" id="input-img" name="img" accept="image/*"></input>

                <label id="label-content" htmlFor="input-content"><b>Describe your Day: </b></label>
                <input type="text" id="input-content" name="content"></input>

                <label id="label-location" htmlFor="input-location"><b>Location: </b></label>
                <input type="text" id="input-location" name="location"></input>


                <button type="submit" className="submit-btn" id="submit-post">Submit</button>
                <button type="reset" className="reset-btn" id="reset-post">Reset</button>
            </form>
        </div>
    )
}