#include "stdafx.h"
#include "MpegBase.h"

// Global functions.
const string cmpc::av_make_error_string2_cpp(int errnum) {
    char errbuf[AV_ERROR_MAX_STRING_SIZE];
    av_strerror(errnum, errbuf, AV_ERROR_MAX_STRING_SIZE);
    string strerrbuf = errbuf;
    return strerrbuf;
}

const string cmpc::av_ts_make_string_cpp(int64_t ts) {
    char tsstrbuf[AV_TS_MAX_STRING_SIZE];
    av_ts_make_string(tsstrbuf, ts);
    string strtsstrbuf = tsstrbuf;
    return strtsstrbuf;
}

const string cmpc::av_ts_make_time_string_cpp(int64_t ts, AVRational* tb) {
    char tsstrbuf[AV_TS_MAX_STRING_SIZE];
    av_ts_make_time_string(tsstrbuf, ts, tb);
    string strtsstrbuf = tsstrbuf;
    return strtsstrbuf;
}

// CharList implementation.
cmpc::CharList::CharList(void) : data() {
}

cmpc::CharList::CharList(const std::vector<string>& args) : data() {
    set(args);
}

cmpc::CharList::CharList(const std::vector<string>&& args) noexcept :
    data(args) {
}

cmpc::CharList::~CharList(void) {
    clear();
}

cmpc::CharList::CharList(const CharList& ref) : data() {
    set(ref.data);
}

cmpc::CharList& cmpc::CharList::operator=(const CharList& ref) {
    if (this != &ref) {
        set(ref.data);
    }
    return *this;
}

cmpc::CharList::CharList(CharList&& ref) noexcept :
    data(std::move(ref.data)) {
}

cmpc::CharList& cmpc::CharList::operator=(CharList&& ref) noexcept {
    if (this != &ref) {
        set(std::move(ref.data));
    }
    return *this;
}

cmpc::CharList& cmpc::CharList::operator=(const std::vector<string>& args) {
    set(args);
    return *this;
}

cmpc::CharList& cmpc::CharList::operator=(std::vector<string>&& args) noexcept {
    set(args);
    return *this;
}

void cmpc::CharList::set(const std::vector<string>& args) {
    data.clear();
    for (auto it = args.begin(); it != args.end(); ++it) {
        string new_str(*it);
        data.push_back(new_str);
    }
}

void cmpc::CharList::set(std::vector<string>&& args) noexcept {
    data = args;
}

void cmpc::CharList::clear() {
    data.clear();
}

std::shared_ptr<const char*> cmpc::CharList::c_str() {
    std::shared_ptr<const char*> pointer(new const char* [data.size() + 1], std::default_delete<const char* []>());
    auto p_cur = pointer.get();
    for (auto it = data.begin(); it != data.end(); ++it) {
        *p_cur = it->c_str();
        p_cur++;
    }
    *p_cur = nullptr;
    return pointer;
}

