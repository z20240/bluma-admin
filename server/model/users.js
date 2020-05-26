class Users {
    generateAuthToken(expiration=60 * 60 * 8) {

    }
        s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})
}